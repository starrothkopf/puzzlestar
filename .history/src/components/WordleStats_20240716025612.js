import React, { useContext, useEffect, useState, useCallback } from 'react'
import { AuthContext } from '../hooks/AuthContext';
import StatTransfer from './StatTransfer';

export default function WordleStats({ id }) {
    const { currentUser } = useContext(AuthContext);
    const [barWidths, setBarWidths] = useState({});
    const [showStatTransfer, setShowStatTransfer] = useState(false);

    const getBarWidth = useCallback((value) => {
        if (value === 0) {
            return 7;
        }
        const maxWins = Math.max(...Object.values(currentUser.wordle_guesses));
        return ((value / maxWins) * 100) -0.5;
    }, [currentUser.wordle_guesses]);

    useEffect(() => {
        if (currentUser) {
            const newWidths = {};
            Object.entries(currentUser.wordle_guesses).forEach(([key, value]) => {
                newWidths[key] = getBarWidth(value);
            });
            setTimeout(() => setBarWidths(newWidths), 50);
        }
    }, [currentUser, getBarWidth]);

    if (!currentUser) {
        return <div>Loading...</div>; 
    }

    const getAverage = () => {
        const { wordle_guesses } = currentUser;
        const totalWins = Object.values(wordle_guesses).reduce((sum, count) => sum + count, 0);
        const totalGuesses = Object.entries(wordle_guesses).reduce((sum, [key, count]) => sum + (parseInt(key) * count), 0);
        if (totalWins === 0) {
            return "0";
        }
        return (totalGuesses / totalWins).toFixed(2);
    };

    const getWinPercentage = () => {
        if (currentUser.wordle_plays === 0) {
            return "N/A";
        }
        return ((currentUser.wordle_wins / currentUser.wordle_plays) * 100).toFixed(1);
    }

    const handleClick = () => {
        setShowStatTransfer(true);
    }

    const closeModal = () => {
        setShowStatTransfer(false);
    };

    return (
        <div className="stats">
            <div className="stattitle">
                <h2>Statistics</h2>
                {!currentUser.statTransfer && <button onClick={handleClick}>Transfer My Stats from NYT</button>}
            </div>
            <div className="stat-line">
                <p>Number of games played:</p>
                <p>{currentUser.wordle_plays}</p>
            </div>
            <div className="stat-line">
                <p>Win percentage:</p>
                <p>{getWinPercentage()}%</p>
            </div>
            <div className="stat-line">
                <p>Average number of guesses:</p>
                <p>{getAverage()}</p>
            </div>
            <br/>
            <p>Guess distribution</p>
            <div className="bars">
                {Object.entries(currentUser.wordle_guesses).map(([key, value]) => (
                    <div key={key} className="bar" style={{ width: `${barWidths[key] || 7}%` }}>
                        {key}: {value}
                    </div>
                ))}
            </div>
            {showStatTransfer && <StatTransfer closeModal={closeModal} />}
        </div>
    )
}