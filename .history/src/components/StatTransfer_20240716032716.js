import React, { useContext, useState } from 'react'
import { AuthContext } from '../hooks/AuthContext';

export default function StatTransfer({closeModal}) {
    const [numPlayed, setNumPlayed] = useState('');
    const [winPerc, setWinPerc] = useState('');

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
                    <p># of games played:</p>
                    <input className="transfer-form-input" type="number" placeholder="100" value={numPlayed} onChange={(e) => setNumPlayed(e.target.value)} />
                </div>
                <div className="stat-line">
                    <p>Win %:</p>
                    <input className="transfer-form-input" type="number" placeholder="98%" value={winPerc} onChange={(e) => setWinPerc(e.target.value)} />
                </div>
            </form>
            <button className="submit" form="stattransfer-form" type="submit" onClick={handleTransfer}>Submit</button>
            <button className="submit" onClick={() => closeModal()}>Cancel</button>
            </div>
        </div>
    )
}

