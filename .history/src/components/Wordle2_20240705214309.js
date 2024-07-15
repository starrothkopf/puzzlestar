import React, { useEffect, useState, useContext } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';
import WordleStats from './WordleStats';
import { AuthContext } from '../hooks/AuthContext';

const Wordle2 = () => {
  const [canPlay, setCanPlay] = useState(true);
  const [solution, setSolution] = useState('');
  const [turn, setTurn] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [countdown, setCountdown] = useState(getTimeUntilMidnight());

  useEffect(() => {
    fetchSolution();

    const timer = setInterval(() => {
      const timeLeft = getTimeUntilMidnight();
      setCountdown(timeLeft);
      if (timeLeft === 0) {
        setCanPlay(true);
        resetGame();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (canPlay) {
      window.addEventListener('keydown', handleKeyPress);
    } else {
      window.removeEventListener('keydown', handleKeyPress);
    }
    
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [canPlay]);

  const fetchSolution = async () => {
    try {
      const response = await axios.get('/path/to/json/server/solution');
      setSolution(response.data.solution);
    } catch (error) {
      console.error('Error fetching solution:', error);
    }
  };

  const handleKeyPress = (event) => {
    // Logic for handling key press, updating turns, checking solution
    // If the word is correct or turns > 5, set canPlay to false
    if (isCorrect || turn > 5) {
      setCanPlay(false);
    }
  };

  const resetGame = () => {
    fetchSolution();
    setTurn(0);
    setIsCorrect(false);
  };

  const getTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return Math.floor((midnight - now) / 1000);
  };

  return (
    <div>
      {canPlay ? (
        <div>Wordle Game UI</div>
      ) : (
        <div>
          <p>You have already played today! Please wait for the next game.</p>
          <p>Time until next game: {countdown} seconds</p>
        </div>
      )}
    </div>
  );
};

export default WordleGame;