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
    
  useEffect(() => {
    const getTimeUntilMidnight = () => {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        const timeLeft = midnight - now;
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        return { hours, minutes, seconds };
      };

      const timer = setInterval(() => {
      const { hours, minutes, seconds } = getTimeUntilMidnight();
      setCountdown({ hours, minutes, seconds });
      if (hours === 0 && minutes === 0 && seconds === 0) {
        // TODO:
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [currentGuess, isCorrect, turn]);



  useEffect(() => {
    
    const handleGameEnd = async (newPlayTime) => {
      await patchData('last_play_time_wordle', newPlayTime);
    };

    if (isCorrect || turn > 5) {
        window.removeEventListener('keyup', handleKeyup);
        currentUser['num_played_wordle'] += 1;
        if (isCorrect) {
          currentUser['num_wins_wordle'] += 1;
          currentUser[`won_in_${turn}`] += 1;
        }
        handleUpdatePlayTime(Date.now().toString());
        currentUser['last_play_time_wordle'] = Date.now().toString();
      } else {
        window.addEventListener('keyup', handleKeyup);
      }
      return () => window.removeEventListener('keyup', handleKeyup);
  }, [currentUser, handleKeyup, isCorrect, turn, patchData]);

  const didUserPlayToday = () => {
    if (currentUser['last_play_time_wordle'] === 0) { // first play
      return false; 
    }
    const lastPlayTime = parseInt(currentUser['last_play_time_wordle'], 10);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(todayStart.getDate() - 1);

    return lastPlayTime >= yesterdayStart.getTime();
  };

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