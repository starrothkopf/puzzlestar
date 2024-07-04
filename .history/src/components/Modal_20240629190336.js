import React from 'react'

export default function Modal({isCorrect, turn, solution}) {
    return (
        <div className="modal">
            {isCorrect && (
                <div>
                    <h1>Impressive</h1>
                    <p className="solution">{solution}</p>
                </div>
            )}
        </div>
    )
}