import React from 'react'

export default function Modal({isCorrect, turn, solution}) {
    return (
        <div className="modal">
            {isCorrect && (
                <div>
                    <h3>Impressive</h3>
                    <p className="solution">{solution}</p>
                    <p>Solved in {turn} guesses</p>
                </div>
            )}
            {!isCorrect && (
                <div>
                    <h1>Better luck next time...</h1>
                    <p className="solution">{solution}</p>
                </div>
            )}
        </div>
    )
}