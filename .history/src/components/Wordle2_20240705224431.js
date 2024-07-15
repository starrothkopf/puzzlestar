import React, { useEffect, useState, useContext } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid';
import Keypad from './Keypad';
import WordleStats from './WordleStats';
import { AuthContext } from '../hooks/AuthContext';

const Wordle2 = ({solution, canPlay}) => {
  const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } = useWordle(solution);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getTimeUntilMidnight = () => {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        return Math.floor((midnight - now) / 1000);
      };
      
    const timer = setInterval(() => {
        const timeLeft = getTimeUntilMidnight();
        setCountdown(timeLeft);
        if (timeLeft === 0) {
          setCanPlay(true);
          setShowModal(false);
        }
      }, 1000);
  
    if (isCorrect || turn > 5) {
        setTimeout(() => setShowModal(true), 2000)
        window.removeEventListener('keyup', handleKeyup);
        currentUser["num_played_wordle"] = currentUser["num_played_wordle"] + 1;
        currentUser["num_wins_wordle"] = isCorrect ? currentUser["num_wins_wordle"] + 1 : currentUser["num_wins_wordle"];
        currentUser[`won_in_${turn}`] = isCorrect ? currentUser[`won_in_${turn}`] + 1 : currentUser[`won_in_${turn}`];
        currentUser['last_play_time_wordle'] = Date.now().toString();
    }
    return () => clearInterval(timer);
  }, [currentUser, handleKeyup, isCorrect, turn]);

  useEffect(() => {
    if (canPlay) {
      window.addEventListener('keyup', handleKeyup);
    } else {
      window.removeEventListener('keyup', handleKeyup);
    }
    return () => window.removeEventListener('keyup', handleKeyup);
  }, [canPlay, handleKeyup]);

  return (
    <div>
        <div className="wordle-container">
            <div className="left-wordle-container">
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

export default Wordle2;