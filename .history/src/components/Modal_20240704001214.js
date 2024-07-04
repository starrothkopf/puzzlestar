import React from 'react'

export default function Modal({isCorrect, turn, solution}) {
    return (
        <div className="modal">
            {isCorrect && (
                <div>
                    <p>Impressive! {solution.toUpperCase()}: solved in {turn} guesses</p>
                </div>
            )}
            {!isCorrect && (
                <div>
                    <p>Better luck next time... {solution.toUpperCase()}: solved in {turn} guesses</p>
                    <h1>Better luck next time...</h1>
                    <p className="solution">{solution}</p>
                </div>
            )}
        </div>
    )
}