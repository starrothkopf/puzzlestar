import React, { useState, useRef, useContext, useCallback, useEffect } from 'react'
import { AuthContext } from '../hooks/AuthContext';
import usePatch from '../hooks/usePatch';
import useSpellPetal from '../hooks/useSpellPetal';
import Poppy from './Poppy';
import RankProgressBar from './RankProgressBar';
import SpellPetalModal from './SpellPetalModal';
import SpellPetalStats from './SpellPetalStats';

const SpellPetal = ({letters, center}) => {
    const {score, maxScore, error, currentGuess, validGuesses, rank, hasWon, handleKeyup} = useSpellPetal(letters, center);
    const { currentUser } = useContext(AuthContext);
    const { patchData } = usePatch();
    const [countdown, setCountdown] = useState(getTimeUntilMidnight());
    const [playedToday, setPlayedToday] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const gameEndedRef = useRef(false);

    useEffect(() => { // handle play time
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        if (currentUser['spellpetal_lastPlayDate'] === 0) {
          setPlayedToday(false);
        } else {
          const lastPlayTime = parseInt(currentUser['spellpetal_lastPlayDate'], 10);
          const played = lastPlayTime >= todayStart.getTime();
          setPlayedToday(played);
          setShowModal(played);
        }
    }, [currentUser]);

    useEffect(() => { // update timer
        const timer = setInterval(async () => {
            const timeLeft = getTimeUntilMidnight();
            setCountdown({
                hours: padWithZero(timeLeft.hours),
                minutes: padWithZero(timeLeft.minutes),
                seconds: padWithZero(timeLeft.seconds)
            });
            if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
                setPlayedToday(false);
                gameEndedRef.current = false;
                if (validGuesses.length > 0) {
                    await patchData('spellpetal_lastPlayDate', (Date.now() - 86400000).toString());
                }
                await patchData('spellpetal_wordsFoundToday', []);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [patchData, rank]);

    const handleGameEnd = useCallback(async (playTime) => { // if the game ends, the user has won (no way to lose, just incrementing score)
        if (gameEndedRef.current) return;
        gameEndedRef.current = true;
        window.removeEventListener('keyup', handleKeyup);
    
        setTimeout(async () => { // delay stat updates for suspense
          try {
            await patchData('spellpetal_lastPlayDate', playTime);
            await patchData('spellpetal_wordsFoundToday', validGuesses);
            await patchData('spellpetal_ranks', { ...currentUser.spellpetal_ranks, "Flowerful": currentUser.spellpetal_ranks["Flowerful"] + 1 }); // game end is very unlikely. if game ends, then user found every single word. otherwise just updating rank as each word is found
            setPlayedToday(true);
            setShowModal(true);
          } catch (error) {
            console.error("Error updating game data:", error);
          }
        }, 1200); // 1.2 second delay
    }, [currentUser, validGuesses, handleKeyup, patchData]);

    useEffect(() => {
        if (!playedToday && !gameEndedRef.current) {
            if (hasWon) {
                handleGameEnd(Date.now().toString());
            } else {
                window.addEventListener('keyup', handleKeyup);
                return () => window.removeEventListener('keyup', handleKeyup);
            }
        }
    }, [currentUser, hasWon, handleKeyup, patchData, playedToday, handleGameEnd]);


    return (
        <div>
            <div className="spellpetal-container">
                <div className="left-spellpetal-container">
                    <SpellPetalModal countdown={countdown} show={showModal} />
                    <div className="error">
                        {(error !== "") && error}
                    </div>
                    <div className="currentGuess">
                        {currentGuess ? currentGuess.toUpperCase() : ""}
                    </div>
                    <div className="poppy-container">
                        <Poppy
                            letters={letters}
                            center={center}
                        />
                    </div>
                </div>
                <div className="right-spellpetal-container">
                    <div className="section-2-spellpetal">
                        <RankProgressBar rank={rank} score={score} maxScore={maxScore} />
                        <div className="words-found">
                            <p>{currentUser.spellpetal_wordsFoundToday.map(word => word.toUpperCase()).join(' ')}</p>
                        </div>
                    </div>
                    <div className="stats">
                        <SpellPetalStats id={currentUser.id}/>
                    </div>
                </div>
            </div>
        </div>
      );
}

export default SpellPetal;

const getTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { hours, minutes, seconds };
  };
  
const padWithZero = (num) => {
return num.toString().padStart(2, '0');
};