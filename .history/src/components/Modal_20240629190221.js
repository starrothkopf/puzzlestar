import React from 'react'

export default function Modal({isCorrect, turn, solution}) {
    return (
        <div className="modal">
            {isCorrect && (
                <div>
                    <h1></h1>
                </div>
            )}
        </div>
    )
}