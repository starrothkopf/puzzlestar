import React, { useState } from 'react'
import usePatch from '../hooks/usePatch';

export default function StatTransfer({closeModal}) {
    const { patchData } = usePatch();
    const [numPlayed, setNumPlayed] = useState('');
    const [winPerc, setWinPerc] = useState('');
    const [guess1, setGuess1] = useState('');
    const [guess2, setGuess2] = useState('');
    const [guess3, setGuess3] = useState('');
    const [guess4, setGuess4] = useState('');
    const [guess5, setGuess5] = useState('');
    const [guess6, setGuess6] = useState('');

    const handleTransfer = async (e) => {
        e.preventDefault();
        if (
            !numPlayed || 
            !winPerc || 
            !guess1 || 
            !guess2 || 
            !guess3 || 
            !guess4 || 
            !guess5 || 
            !guess6
        ) {
            alert('Empty fields! Sounds peaceful...');
            return;
        }

        const numWins = Math.round((winPerc / 100) * numPlayed);
        try {
            await patchData('wordle_plays', parseInt(numPlayed));
            await patchData('wordle_wins', numWins); 
            await patchData('wordle_guesses', {
                "1": parseInt(guess1),
                "2": parseInt(guess2),
                "3": parseInt(guess3),
                "4": parseInt(guess4),
                "5": parseInt(guess5),
                "6": parseInt(guess6)
            });
            await patchData('statTransfer', true);
          } catch (error) {
            console.error("Error updating game data:", error);
          }
       closeModal();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
            <p>We're going honor-system manual-style.</p>
            <p>You can only do this once.</p>
            <form className="transfer-form" id="stattransfer-form">
                <div className="stat-line">
                    <p>Games played:</p>
                    <input className="transfer-form-input" type="text" placeholder="178" value={numPlayed} onChange={(e) => setNumPlayed(e.target.value)} />
                </div>
                <div className="stat-line">
                    <p>Win %:</p>
                    <input className="transfer-form-input" type="text" placeholder="98" value={winPerc} onChange={(e) => setWinPerc(e.target.value)} />
                </div>
                <div className="stat-line">
                    <p>Wins in 1 guess:</p>
                    <input className="transfer-form-input" type="text" placeholder="0" value={guess1} onChange={(e) => setGuess1(e.target.value)} />
                </div>
                <div className="stat-line">
                    <p>Wins in 2 guesses:</p>
                    <input className="transfer-form-input" type="text" placeholder="13" value={guess2} onChange={(e) => setGuess2(e.target.value)} />
                </div>
                <div className="stat-line">
                    <p>Wins in 3 guesses:</p>
                    <input className="transfer-form-input" type="text" placeholder="48" value={guess3} onChange={(e) => setGuess3(e.target.value)} />
                </div>
                <div className="stat-line">
                    <p>Wins in 4 guesses:</p>
                    <input className="transfer-form-input" type="text" placeholder="69" value={guess4} onChange={(e) => setGuess4(e.target.value)} />
                </div>
                <div className="stat-line">
                    <p>Wins in 5 guesses:</p>
                    <input className="transfer-form-input" type="text" placeholder="33" value={guess5} onChange={(e) => setGuess5(e.target.value)} />
                </div>
                <div className="stat-line">
                    <p>Wins in 6 guesses:</p>
                    <input className="transfer-form-input" type="text" placeholder="12" value={guess6} onChange={(e) => setGuess6(e.target.value)} />
                </div>
            </form>
            <button className="submit" form="stattransfer-form" type="submit" onClick={handleTransfer}>Submit</button>
            <button className="submit" type="button" onClick={() => closeModal()}>Cancel</button>
            </div>
        </div>
    )
}

