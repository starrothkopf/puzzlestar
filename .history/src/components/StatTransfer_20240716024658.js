import React, { useContext } from 'react'
import { AuthContext } from '../hooks/AuthContext';

const congratulations = [
    'Genius',
    'Magnificent',
    'Impressive',
    'Splendid',
    'Great',
    'Phew',
  ];

export default function Modal({solution, countdown, show}) {
    const { currentUser } = useContext(AuthContext);
    if (!show) return null;
    return (
        <div className="modal">
            {currentUser.wordle_lastPlayWin ? (
                    <>
                        <p>{congratulations[currentUser.wordle_lastPlayGuesses - 1]}</p>
                        <p>You solved in {currentUser.wordle_lastPlayGuesses} turn{currentUser.wordle_lastPlayGuesses !== 1 && 's'}</p>
                    </>
                ) : (
                    <>
                        <p>Next time!</p>
                        <p>Solution: {solution.toUpperCase()}</p>
                    </>
                )}
            <div className="timer">
            {padWithZero(countdown.hours)}:{padWithZero(countdown.minutes)}:{padWithZero(countdown.seconds)}
            </div>
        </div>
    )
}

const padWithZero = (num) => {
    return num.toString().padStart(2, '0');
  };