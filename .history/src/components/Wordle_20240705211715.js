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
    const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [canPlay, setCanPlay] = useState(true);
    const [gameProcessed, setGameProcessed] = useState(false);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup);

        const updateCountdown = () => {
            const now = new Date();
            const midnight = new Date();
            midnight.setHours(24, 0, 0, 0);
            const timeUntilMidnight = midnight.getTime() - now.getTime();
            const hours = Math.floor(timeUntilMidnight / (1000 * 60 * 60));
            const minutes = Math.floor((timeUntilMidnight % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeUntilMidnight % (1000 * 60)) / 1000);
            setCountdown({ hours, minutes, seconds });
        };

        updateCountdown();

        const interval = setInterval(updateCountdown, 1000);

        const checkPlayAvailability = () => {
            const lastPlayedStr = currentUser['last_play_time_wordle'];
            if (lastPlayedStr) {
                const lastPlayed = new Date(parseInt(lastPlayedStr));
                const now = new Date();
                const midnight = new Date();
                midnight.setHours(24, 0, 0, 0);
                if (now >= midnight || now < lastPlayed) {
                    setCanPlay(true);
                } else {
                    setCanPlay(false);
                }
            } else {
                setCanPlay(true); // first play
            }
        };

        checkPlayAvailability();
        return () => {
            window.removeEventListener('keyup', handleKeyup);
            
        };
    }, [handleKeyup, currentUser]);

    useEffect(() => {
        if ((isCorrect || turn > 5) && !gameProcessed) {
            setTimeout(() => setShowModal(true), 2000)
            window.removeEventListener('keyup', handleKeyup);

            currentUser["num_played_wordle"] = currentUser["num_played_wordle"] + 1;
            currentUser["num_wins_wordle"] = isCorrect ? currentUser["num_wins_wordle"] + 1 : currentUser["num_wins_wordle"];
            currentUser[`won_in_${turn}`] = isCorrect ? currentUser[`won_in_${turn}`] + 1 : currentUser[`won_in_${turn}`];
            
            currentUser['last_play_time_wordle'] = Date.now().toString();
            setGameProcessed(true);
        }
        return() => window.removeEventListener('keyup', handleKeyup);
    }, [handleKeyup, isCorrect, turn, currentUser])
    
    return (
        <div>
            <div className="wordle-container">
                <div className="left-wordle-container">
                {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} countdown={countdown} />}
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