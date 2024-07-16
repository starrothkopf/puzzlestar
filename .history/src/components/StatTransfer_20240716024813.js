import React, { useContext } from 'react'
import { AuthContext } from '../hooks/AuthContext';

export default function StatTransfer() {
    const { currentUser } = useContext(AuthContext);
    if (!show) return null;
    return (
        <div className="stattransfer">
            <p>Honor systel manual style, so you can only do this once.</p>
            {currentUser.wordle_lastPlayWin ? (
                    <>
                        <p>{congratulations[currentUser.wordle_lastPlayGuesses - 1]}</p>
                        <p>You solved in {currentUser.wordle_lastPlayGuesses} turn{currentUser.wordle_lastPlayGuesses !== 1 && 's'}</p>
                    </>
                ) : (
                    <>
                        <p>Next time!</p>
                        <p>Solution: {solution.toUpperCase()}</p>
                    </>
                )}
            <div className="timer">
            {padWithZero(countdown.hours)}:{padWithZero(countdown.minutes)}:{padWithZero(countdown.seconds)}
            </div>
        </div>
    )
}

