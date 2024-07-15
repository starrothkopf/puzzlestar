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
    const getTimeUntilMidnight = () => {
        const now = new Date();
        const midnight = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + 1,
          0,
          0,
          0
        );
        const timeLeft = midnight - now;
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        return { hours, minutes, seconds };
      };

      const timer = setInterval(() => {
      const { hours, minutes, seconds } = getTimeUntilMidnight();
      setCountdown({ hours, minutes, seconds });

    }, 1000);
    return () => clearInterval(timer);
  }, [currentGuess, isCorrect, turn]);

  const didUserPlayToday = useCallback(() => {
    if (currentUser['last_play_time_wordle'] === 0) { // first play
      return false;
    }
    const lastPlayTime = parseInt(currentUser['last_play_time_wordle'], 10);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(todayStart.getDate() - 1);

    return lastPlayTime >= yesterdayStart.getTime();
  }, [currentUser]);

  useEffect(() => {
    const handleGameEnd = async (playTime) => {
      await patchData('last_play_time_wordle', playTime);
      await patchData('num_played_wordle', currentUser['num_played_wordle'] + 1);
      if (isCorrect) {
          await patchData('num_wins_wordle', currentUser['num_wins_wordle'] + 1);
          await patchData(`won_in_${turn}`, currentUser[`won_in_${turn}`] + 1);
      }
    };

    if ((isCorrect || turn > 5) && didUserPlayToday) {
        window.removeEventListener('keyup', handleKeyup);
        handleGameEnd(Date.now().toString());
      } else {
        window.addEventListener('keyup', handleKeyup);
      }
      return () => window.removeEventListener('keyup', handleKeyup);
  }, [currentUser, handleKeyup, isCorrect, turn, patchData, didUserPlayToday]);

  return (
    <div>
        <div className="wordle-container">
            <div className="left-wordle-container">
              {!didUserPlayToday() ? (
                <Grid
                  currentGuess={currentGuess}
                  guesses={guesses}
                  turn={turn}
                />
              ) : (
                <Modal isCorrect={isCorrect} turn={turn} solution={solution} countdown={countdown} />
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