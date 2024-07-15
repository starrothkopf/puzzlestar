import React from 'react'
import { padWithZero } from '../util.js';

const congratulations = [
    'Genius',
    'Magnificent',
    'Impressive',
    'Splendid',
    'Great',
    'Phew',
  ];

export default function Modal({isCorrect, turn, solution, countdown}) {
    return (
        <div className="modal">
            {isCorrect && (
                <p>{congratulations[turn - 1]}</p>
            )}
            {!isCorrect && (
                <p>Solution: {solution.toUpperCase()}</p>
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