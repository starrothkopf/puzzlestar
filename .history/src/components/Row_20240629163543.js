import React from 'react'

export default function Row({guess}) {

    if (guess) {
        return (
            <div className="row past">
                {guess.map((l, i) => {
                    <div</dive>

                })}
            </div>
        )
    }

    return (
        <div className="row">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}