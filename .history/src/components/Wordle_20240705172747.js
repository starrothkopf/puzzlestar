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

        if (isCorrect || turn > 5) {
            setTimeout(() => setShowModal(true), 2000)
            window.removeEventListener('keyup', handleKeyup);

            currentUser["num_played"] = currentUser["num_played"] + 1;
            currentUser["num_wins"] = isCorrect ? currentUser["num_wins"] + 1 : currentUser["num_wins"];
            currentUser[`won_in_${turn}`] = isCorrect ? currentUser[`won_in_${turn}`] + 1 : currentUser[`won_in_${turn}`];
        }

        return() => window.removeEventListener('keyup', handleKeyup);
    }, [handleKeyup, isCorrect, turn, currentUser])
    
    return (
        <div>
            <div className="wordle-container">
                <div className="left-wordle-container">
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