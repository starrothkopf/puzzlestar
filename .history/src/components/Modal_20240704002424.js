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
    const getRandomMessage = () => {
        const randomIndex = Math.floor(Math.random() * congratulationMessages.length);
        return congratulationMessages[randomIndex];
        };
    
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