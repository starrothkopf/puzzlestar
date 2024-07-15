import React, { useEffect, useState, useContext } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';
import WordleStats from './WordleStats';
import { AuthContext } from '../hooks/AuthContext';

export default function Wordle({solution}) {
    const {currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys} = useWordle(solution);
    const [showModal, setShowModal] = useState(false)
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup);

        const checkPlayAvailability = () => {
            const lastPlayedStr = currentUser['last_play_time_wordle'];
            if (lastPlayedStr) {
              const lastPlayed = new Date(parseInt(lastPlayedStr));
              const now = new Date();
      
              // Calculate time until next play is available (next midnight)
              const midnight = new Date();
              midnight.setHours(24, 0, 0, 0);
              if (now >= midnight || now < lastPlayed) {
                // User can play now
                setCountdown(null);
              } else {
                // Calculate time until next midnight
                const timeUntilMidnight = midnight.getTime() - now.getTime();
                const hours = Math.floor(timeUntilMidnight / (1000 * 60 * 60));
                const minutes = Math.floor((timeUntilMidnight % (1000 * 60 * 60)) / (1000 * 60));
                setCountdown({ hours, minutes });
              }
            } else {
              // First time playing
              setCountdown(null);
            }
        };

        if (isCorrect || turn > 5) {
            setTimeout(() => setShowModal(true), 2000)
            window.removeEventListener('keyup', handleKeyup);

            currentUser["num_played_wordle"] = currentUser["num_played_wordle"] + 1;
            currentUser["num_wins_wordle"] = isCorrect ? currentUser["num_wins_wordle"] + 1 : currentUser["num_wins_wordle"];
            currentUser[`won_in_${turn}`] = isCorrect ? currentUser[`won_in_${turn}`] + 1 : currentUser[`won_in_${turn}`];
        }
        return() => window.removeEventListener('keyup', handleKeyup);
    }, [handleKeyup, isCorrect, turn, currentUser])
    
    return (
        <div>
            <div className="wordle-container">
                <div className="left-wordle-container">
                {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
                <Grid 
                    currentGuess={currentGuess}
                    guesses={guesses}
                    turn={turn}
                />
                </div>
                <div className="right-wordle-container">
                    <Keypad usedKeys={usedKeys}/>
                    <WordleStats id={currentUser.id}/>
                </div>
            </div>
        </div>
    )
}