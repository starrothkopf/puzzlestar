import React, { useEffect, useState, useContext } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';
import WordleStats from './WordleStats';
import { AuthContext } from '../hooks/AuthContext';

const Wordle = ({solution}) => {
    const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } = useWordle(solution);
    const { currentUser } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false)
    const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });

    const saveGameState = (state) => {
      localStorage.setItem('wordleGameState', JSON.stringify(state));
    };

    const loadGameState = () => {
      const gameStateJSON = localStorage.getItem('wordleGameState');
      return gameStateJSON ? JSON.parse(gameStateJSON) : null;
    };
    
  useEffect(() => {
    saveGameState({ currentGuess, turn, isCorrect });

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
        setShowModal(false);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [currentGuess, isCorrect', and 'turn]);

  useEffect(() => {
    if (isCorrect || turn > 5) {
        setTimeout(() => setShowModal(true), 2000)
        window.removeEventListener('keyup', handleKeyup);
        currentUser['num_played_wordle'] += 1;
        if (isCorrect) {
          currentUser['num_wins_wordle'] += 1;
          currentUser[`won_in_${turn}`] += 1;
        }
        currentUser['last_play_time_wordle'] = Date.now().toString();
      } else {
        window.addEventListener('keyup', handleKeyup);
      }
      return () => window.removeEventListener('keyup', handleKeyup);
  }, [currentUser, handleKeyup, isCorrect, turn]);

  return (
    <div>
        <div className="wordle-container">
            <div className="left-wordle-container">
            {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} countdown={countdown} />}
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