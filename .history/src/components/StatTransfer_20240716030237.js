import React, { useContext } from 'react'
import { AuthContext } from '../hooks/AuthContext';

export default function StatTransfer({closeModal}) {
    const { currentUser } = useContext(AuthContext);

    const handleTransfer = () => {
        // Logic for transferring stats
        console.log("Stats transferred for", currentUser.username);
        closeModal();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>We're going honor-system manual-style, so you can only do this once.</p>
                <button className="signup" onClick={handleTransfer}>Submit</button>
                <button className="signup" onClick={() => closeModal()}>Cancel</button>
            </div>
        </div>
    )
}

