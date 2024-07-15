import React, { useEffect, useState, useCallback, useRef, useContext } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';
import WordleStats from './WordleStats';
import { AuthContext } from '../hooks/AuthContext';
import usePatch from '../hooks/usePatch';
import 

const Wordle = ({solution}) => {
  const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } = useWordle(solution);
  const { currentUser, updateCurrentUser } = useContext(AuthContext);
  const { patchData } = usePatch();
  const [countdown, setCountdown] = useState(getTimeUntilMidnight());
  const [playedToday, setPlayedToday] = useState(false);
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
    console.log("HANDLING GAME END");
    gameEndedRef.current = true;
    window.removeEventListener('keyup', handleKeyup);

    try {
      await patchData('wordle_lastPlayDate', playTime);
      await patchData('wordle_plays', currentUser.wordle_plays + 1);
      
      if (isCorrect) {
        await patchData('wordle_wins', currentUser.wordle_wins + 1);
        if (turn >= 1 && turn <= 6) {
          await patchData(`wordle_guesses.${turn}`, (currentUser.wordle_guesses[turn] || 0) + 1);
        }
      }
  
      setPlayedToday(true);
    } catch (error) {
      console.error("Error updating game data:", error);
      // TODO: add some user-facing error handling here
    }
  }, [updateCurrentUser, handleKeyup, isCorrect, turn, patchData]);

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
              {playedToday && <Modal isCorrect={isCorrect} turn={turn} solution={solution} countdown={countdown} />}
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
