import React, { useContext, useState } from 'react'
import { AuthContext } from '../hooks/AuthContext';

export default function StatTransfer({closeModal}) {
    const { currentUser } = useContext(AuthContext);
    const [numPlayed, setnumPlayed] = useState('');

    const handleTransfer = () => {
        // Logic for transferring stats
        console.log("Stats transferred for", currentUser.username);
        closeModal();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
            <p>We're going honor-system manual-style—you can only do this once.</p>
            <form id="stattransfer-form">
                <input type="text" placeholder="Username" value={numPlayed} onChange={(e) => setNumPlayed(e.target.value)} />
                <input type="password" placeholder="Password"value={password} onChange={(e) => setStat1(e.target.value)} />
            </form>
            <button className="submit" form="stattransfer-form" type="submit" onClick={handleTransfer}>Submit</button>
            <button className="submit" onClick={() => closeModal()}>Cancel</button>
            </div>
        </div>
    )
}

