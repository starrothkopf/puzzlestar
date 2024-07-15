import React, { useEffect, useState, useContext } from 'react'
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
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [playedToday, setPlayedToday] = useState(false);
  
  useEffect(() => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    if (currentUser['wordle_lastPlayDate'] === 0) {
      setPlayedToday(false);
    } else {
      const lastPlayTime = parseInt(currentUser['wordle_lastPlayDate'], 10);
      setPlayedToday(lastPlayTime >= todayStart.getTime());
    }
  }, [currentUser]);
    
  useEffect(() => {
    function getTimeUntilMidnight() {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      return { hours, minutes, seconds };
    }
      const timer = setInterval(() => {
      const { hours, minutes, seconds } = getTimeUntilMidnight();
      setCountdown({ hours, minutes, seconds });

    }, 1000);
    return () => clearInterval(timer);
  }, [currentGuess, isCorrect, turn]);

  useEffect(() => {
    console.log("isCorrect:", isCorrect);
    console.log("turn:", turn);
    console.log("wordle_lastPlayDate:", currentUser.wordle_lastPlayDate);
    console.log("playedToday:", playedToday);

    if ((isCorrect || turn > 5) && !playedToday) {
      handleGameEnd(Date.now().toString());
    } else {
      window.addEventListener('keyup', handleKeyup);
    }
    return () => window.removeEventListener('keyup', handleKeyup);
  }, [currentUser, handleKeyup, isCorrect, turn, patchData, playedToday]);

  return (
    <div>
        <div className="wordle-container">
            <div className="left-wordle-container">
              {playedToday ? (
                <Modal isCorrect={isCorrect} turn={turn} solution={solution} countdown={countdown} />
              ) : (
                <Grid
                  currentGuess={currentGuess}
                  guesses={guesses}
                  turn={turn}
                />
              )}
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