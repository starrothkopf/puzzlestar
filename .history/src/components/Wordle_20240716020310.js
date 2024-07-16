import React, { useEffect, useState, useCallback, useRef, useContext } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';
import WordleStats from './WordleStats';
import { AuthContext } from '../hooks/AuthContext';
import usePatch from '../hooks/usePatch';

const Wordle = ({solution}) => {
  const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } = useWordle(solution);
  const { currentUser } = useContext(AuthContext);
  const { patchData } = usePatch();
  const [countdown, setCountdown] = useState(getTimeUntilMidnight());
  const [playedToday, setPlayedToday] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const gameEndedRef = useRef(false);
  
  useEffect(() => { // handle play time
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    if (currentUser['wordle_lastPlayDate'] === 0) {
      setPlayedToday(false);
    } else {
      const lastPlayTime = parseInt(currentUser['wordle_lastPlayDate'], 10);
      setPlayedToday(lastPlayTime >= todayStart.getTime());
    }
  }, [currentUser]);
    
  useEffect(() => { // update timer
    const timer = setInterval(() => {
      const timeLeft = getTimeUntilMidnight();
      setCountdown({
        hours: padWithZero(timeLeft.hours),
        minutes: padWithZero(timeLeft.minutes),
        seconds: padWithZero(timeLeft.seconds)
      });
      if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
        setPlayedToday(false);
        gameEndedRef.current = false;
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleGameEnd = useCallback(async (playTime) => {
    if (gameEndedRef.current) return;
    gameEndedRef.current = true;
    window.removeEventListener('keyup', handleKeyup);

    try {
      await patchData('wordle_lastPlayDate', playTime);
      await patchData('wordle_plays', currentUser.wordle_plays + 1);
      if (isCorrect) {
        await patchData('wordle_wins', currentUser.wordle_wins + 1);
        await patchData('wordle_lastPlayGuesses', turn);
        await patchData('wordle_lastPlayWin', true);
        await patchData(`wordle_guesses.${turn}`, (currentUser.wordle_guesses[turn] || 0) + 1);
      } else {
        await patchData('wordle_lastPlayWin', false);
      }
      setPlayedToday(true);
    } catch (error) {
      console.error("Error updating game data:", error);
      // TODO: add some user-facing error handling here
    }
  }, [currentUser, handleKeyup, isCorrect, turn, patchData]);

  useEffect(() => {
    if (!playedToday && !gameEndedRef.current) {
      if (isCorrect || turn > 5) {
        handleGameEnd(Date.now().toString());
      } else {
        window.addEventListener('keyup', handleKeyup);
        return () => window.removeEventListener('keyup', handleKeyup);
      }
    }
  }, [currentUser, handleKeyup, isCorrect, turn, patchData, playedToday, handleGameEnd]);

  return (
    <div>
        <div className="wordle-container">
            <div className="left-wordle-container">
              <Modal solution={solution} countdown={countdown} />
              <Grid
                currentGuess={currentGuess}
                guesses={guesses}
                turn={turn}
              />
            </div>
            <div className="right-wordle-container">
                <Keypad usedKeys={usedKeys}/>
                <WordleStats id={currentUser.id}/>
            </div>
        </div>
    </div>
  );
};

export default Wordle;

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