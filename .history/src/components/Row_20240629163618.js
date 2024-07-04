import React from 'react'

export default function Row({guess}) {

    if (guess) {
        return (
            <div className="row past">
                {guess.map((l, i) => {
                    <div key={i}>{l}</div>

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