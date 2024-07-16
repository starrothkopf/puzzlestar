import React, { useContext, useState } from 'react'
import { AuthContext } from '../hooks/AuthContext';

export default function StatTransfer({closeModal}) {
    const { currentUser } = useContext(AuthContext);
    const [numPlayed, setNumPlayed] = useState('');
    const [winPerc, setWinPerc] = useState('');
    const [guess1, setGuess1] = useState('');
    const [guess2, setGuess2] = useState('');
    const [guess3, setGuess3] = useState('');
    const [guess4, setGuess4] = useState('');
    const [guess5, setGuess5] = useState('');
    const [guess6, setGuess6] = useState('');

    const handleTransfer = () => {
        // Logic for transferring stats
       closeModal();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
            <p>We're going honor-system manual-style—you can only do this once.</p>
            <form className="transfer-form" id="stattransfer-form">
                <div className="stat-line">
                    <p>Games played:</p>
                    <input className="transfer-form-input" type="number" placeholder="100" value={numPlayed} onChange={(e) => setNumPlayed(e.target.value)} />
                </div>
                <div className="stat-line">
                    <p>Win %:</p>
                    <input className="transfer-form-input" type="number" placeholder="98%" value={winPerc} onChange={(e) => setWinPerc(e.target.value)} />
                </div>
                <div className="stat-line">
                    <p>Wins in 1 guess:</p>
                    <input className="transfer-form-input" type="number" placeholder="0" value={guess1} onChange={(e) => setGuess1(e.target.value)} />
                </div>
                <div className="stat-line">
                    <p>Wins in 2 guesses:</p>
                    <input className="transfer-form-input" type="number" placeholder="13" value={guess1} onChange={(e) => setGuess1(e.target.value)} />
                </div>
                <div className="stat-line">
                    <p>Wins in 3 guesses:</p>
                    <input className="transfer-form-input" type="number" placeholder="0" value={guess1} onChange={(e) => setGuess1(e.target.value)} />
                </div>
                <div className="stat-line">
                    <p>Wins in 4 guesses:</p>
                    <input className="transfer-form-input" type="number" placeholder="0" value={guess1} onChange={(e) => setGuess1(e.target.value)} />
                </div>
                <div className="stat-line">
                    <p>Wins in 5 guesses:</p>
                    <input className="transfer-form-input" type="number" placeholder="0" value={guess1} onChange={(e) => setGuess1(e.target.value)} />
                </div>
                <div className="stat-line">
                    <p>Wins in 6 guesses:</p>
                    <input className="transfer-form-input" type="number" placeholder="0" value={guess1} onChange={(e) => setGuess1(e.target.value)} />
                </div>
            </form>
            <button className="submit" form="stattransfer-form" type="submit" onClick={handleTransfer}>Submit</button>
            <button className="submit" onClick={() => closeModal()}>Cancel</button>
            </div>
        </div>
    )
}

