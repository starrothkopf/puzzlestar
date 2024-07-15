import React, { useEffect, useState, useContext } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';
import WordleStats from './WordleStats';
import { AuthContext } from '../hooks/AuthContext';

const Wordle2 = ({solution}) => {
    const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } = useWordle(solution);
    const { currentUser } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false)
    const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [canPlay, setCanPlay] = useState(true);
    
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
        setCanPlay(true);
        setShowModal(false);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isCorrect || turn > 5) {
        setTimeout(() => setShowModal(true), 2000)
        window.removeEventListener('keyup', handleKeyup);
        currentUser.num_played_wordle += 1;
      if (isCorrect) {
        currentUser.num_wins_wordle += 1;
        currentUser[`won_in_${turn}`] += 1;
      }
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

export default Wordle2;