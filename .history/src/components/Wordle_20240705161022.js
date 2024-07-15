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

            oldNumPlayed = currentUser["num_played"];
            
            const data = {
                id: currentUser["id"],
                win: isCorrect,
                turns: turn
            };
            fetch(`http://localhost:3001/users/${currentUser["id"]}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
        	body: JSON.stringify({ username: updatedUsername }),
		})
		.then(response => {
			if (response.ok) {
				updateCurrentUser({ ...currentUser, username: updatedUsername });
				setEditingUsername(false);
			} else {
				console.error('Failed to update username');
			}
		})
		.catch(error => console.error('Error updating username:', error));
        }

        return() => window.removeEventListener('keyup', handleKeyup);
    }, [handleKeyup, isCorrect, turn])
    
    return (
        <div>
            <div className="wordle-container">
                {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
                <Grid 
                    currentGuess={currentGuess}
                    guesses={guesses}
                    turn={turn}
                />
                <div className="right-wordle-container">
                    <Keypad usedKeys={usedKeys}/>
                    <WordleStats id={currentUser.id}/>
                </div>
            </div>
        </div>
    )
}