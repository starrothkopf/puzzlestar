import React from 'react'

export default function Modal({isCorrect, turn, solution}) {
    return (
        <div className="modal">
            {isCorrect && (
                <div>
                    <h1>You </h1>
                </div>
            )}
        </div>
    )
}