import React from 'react'

export default function Row({guess, currentGuess}) {

  if (guess) {
    return (
      <div className="row past">
          {guess.map((l, i) => (
            <div key={i} className={l.color}>{l.key}</div>
          ))}
      </div>
    )
  }

  if (currentGuess) {
    let letters = currentGuess.split('');
    return (
      <div className="row"></div>
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