import React from 'react'

export default function Row({guess}) {

    if (guess) {
        return (
            <div className="row past">
                {guess}
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