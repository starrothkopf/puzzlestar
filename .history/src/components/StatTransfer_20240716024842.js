import React, { useContext } from 'react'
import { AuthContext } from '../hooks/AuthContext';

export default function StatTransfer() {
    const { currentUser } = useContext(AuthContext);
    return (
        <div className="stattransfer">
            <p>Honor systel manual-style, so you can only do this once.</p>
            
        </div>
    )
}

