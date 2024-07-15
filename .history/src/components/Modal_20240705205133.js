import React from 'react'

const congratulations = [
    'Too smart?!',
    'Genius',
    'Impressive',
    'Nice job',
    'Not bad!',
    'Phew!',
  ];

export default function Modal({isCorrect, turn, solution, countdown}) {
    return (
        <div className="modal">
            {isCorrect && (
                <p>{congratulations[turn - 1]}</p>
            )}
            {!isCorrect && (
                <p>Better luck next time... Solution: {solution.toUpperCase()}</p>
            )}
            <div className="timer">
                {countdown.hours}:{countdown.minutes}:{countdown.seconds}
            </div>
        </div>
    )
}