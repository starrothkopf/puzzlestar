import React, { useEffect, useState, useContext } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';
import WordleStats from './WordleStats';
import { AuthContext } from '../hooks/AuthContext';

const Wordle2 = () => {
    const {currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys} = useWordle(solution);
  const [canPlay, setCanPlay] = useState(true);
  const [solution, setSolution] = useState('');
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
      window.addEventListener('keyup', handleKeyup);
    } else {
      window.removeEventListener('keyup', handleKeyup);
    }
    
    return () => window.removeEventListener('keyup', handleKeyup);
  }, [canPlay]);

  const fetchSolution = async () => {
    fetch('http://localhost:3001/solutions') // FOR CPANEL: https://star.publish.library.wustl.edu/fetchSolutions.php
      .then(res => res.json())
      .then(json => {
        // FOR CPANEL: const solutions = json.solutions;
        const solutions = json;
        if (solutions && solutions.length > 0) {
          const randomSolution = solutions[Math.floor(Math.random() * solutions.length)];
          setSolution(randomSolution.word);
        }
      })
      .catch(error => {
        console.error('There was a problem fetching the solution:', error);
      });
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