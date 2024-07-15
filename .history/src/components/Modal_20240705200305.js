import React from 'react'

const congratulations = [
    'Too smart?!',
    'Genius',
    'Impressive',
    'Nice job',
    'Not bad!',
    'Phew!',
  ];

export default function Modal({isCorrect, turn, solution}) {
    return (
        <div className="modal">
            {isCorrect && (
            
                    <p>{congratulations[turn - 1]}</p>
                </div>
            )}
            {!isCorrect && (
                <div>
                    <p>Better luck next time... Solution: {solution.toUpperCase()}</p>
                </div>
            )}
            <p>Next Stardle...</p>
            <div className="timer">
                17:59:12
            </div>
        </div>
    )
}