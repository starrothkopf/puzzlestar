import React from 'react'

const congratulations = [
    'Too smart?!',
    'Genius',
    'Impressive',
    'Nice job',
    'Well done',
    'Phew!',
  ];

export default function Modal({isCorrect, turn, solution}) {
    return (
        <div className="modal">
            {isCorrect && (
                <div>
                    <p>Impressive!</p>
                </div>
            )}
            {!isCorrect && (
                <div>
                    <p>Better luck next time... Solution: {solution.toUpperCase()}</p>
                </div>
            )}
        </div>
    )
}