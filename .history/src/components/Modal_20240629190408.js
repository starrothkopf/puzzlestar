import React from 'react'

export default function Modal({isCorrect, turn, solution}) {
    return (
        <div className="modal">
            {isCorrect && (
                <div>
                    <h1>Impressive</h1>
                    <p className="solution">{solution}</p>
                    <p>You found the solution in {turn} guesses :)</p>
                </div>
            )}
            {!isCorrect && (
                <div>
                    <h1>Impressive</h1>
                    <p className="solution">{solution}</p>
                    <p>You found the solution in {turn} guesses :)</p>
                </div>
            )}
        </div>
    )
}