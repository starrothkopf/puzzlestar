import React from 'react'

export default function Grid({currentGuess, guesses, turn}) {
    return (
        <div>
            {guesses.map((g, i) => {
                return <Ro key={i}/>
            })}
        </div>
    )
}