import React, { useContext } from 'react'
import { AuthContext } from '../hooks/AuthContext';

export default function StatTransfer(closeModal) {
    const { currentUser } = useContext(AuthContext);

    const handleTransfer = () => {
        // Logic for transferring stats
        console.log("Stats transferred for", currentUser.username);
        closeModal();
    };
    
    return (
        <div className="stattransfer">
            <p>Honor systel manual-style, so you can only do this once.</p>
            <p>{currentUser.username}</p>
        </div>
    )
}

