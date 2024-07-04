import React from 'react'

export default function Modal({isCorrect, turn, solution}) {
    return (
        <div className="modal">
            {isCorrect && (
                <div>
                    <p>Impressive! Solved in {turn} guesses</p>
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