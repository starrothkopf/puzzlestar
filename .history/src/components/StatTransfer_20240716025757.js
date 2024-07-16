import React, { useContext } from 'react'
import { AuthContext } from '../hooks/AuthContext';

export default function StatTransfer({closeModal) {
    const { currentUser } = useContext(AuthContext);

    const handleTransfer = () => {
        // Logic for transferring stats
        console.log("Stats transferred for", currentUser.username);
        closeModal();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>Honor system manual-style, so you can only do this once.</p>
                <p>{currentUser.username}</p>
                <button onClick={handleTransfer}>Transfer Stats</button>
                <button onClick={() => closeModal()}>Cancel</button>
            </div>
        </div>
    )
}

