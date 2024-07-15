import React, { useEffect, useState, useCallback, useContext } from 'react'
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

  const playedToday = useCallback(() => {
    if (currentUser['last_play_time_wordle'] === 0) { // first play
      return false;
    }
    const lastPlayTime = parseInt(currentUser['last_play_time_wordle'], 10);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
  
    return lastPlayTime >= todayStart.getTime();
  }, [currentUser]);

  useEffect(() => {
    const handleGameEnd = async (playTime) => {
      window.removeEventListener('keyup', handleKeyup);
      await patchData('last_play_time_wordle', playTime);
      await patchData('num_played_wordle', currentUser['num_played_wordle'] + 1);
      if (isCorrect) {
          await patchData('num_wins_wordle', currentUser['num_wins_wordle'] + 1);
          await patchData(`won_in_${turn}`, currentUser[`won_in_${turn}`] + 1);
      }
    };
    console.log()

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
              {playedToday() ? (
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