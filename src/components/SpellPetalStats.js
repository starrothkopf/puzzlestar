import React, { useContext, useEffect, useState, useCallback } from 'react'
import { AuthContext } from '../hooks/AuthContext';

export default function SpellPetalStats({ id }) {
    const { currentUser } = useContext(AuthContext);
    const [barWidths, setBarWidths] = useState({});

    const getBarWidth = useCallback((value) => {
        const minWidth = 20;
        if (value === 0) {
            return minWidth;
        }
        const maxWins = Math.max(...Object.values(currentUser.spellpetal_ranks));
        const relativeWidth = (value / maxWins) * 100;
        const adjustedWidth = relativeWidth + minWidth;
    
        // Ensure the adjusted width does not exceed 100%
        return Math.min(adjustedWidth, 100 - 1);
    }, [currentUser.spellpetal_ranks]);

    useEffect(() => {
        if (currentUser) {
            const newWidths = {};
            Object.entries(currentUser.spellpetal_ranks).forEach(([key, value]) => {
                newWidths[key] = getBarWidth(value);
            });
            setTimeout(() => setBarWidths(newWidths), 50);
        }
    }, [currentUser, getBarWidth]);

    if (!currentUser) {
        return <div>Loading...</div>; 
    }

    const getPlayed = () => {
        const { spellpetal_ranks } = currentUser;
        const totalPlays = Object.values(spellpetal_ranks).reduce((sum, count) => sum + count, 0);
        return totalPlays;
    };

    const getAverage = () => {
        const { spellpetal_ranks } = currentUser;
        
        const rankValues = {
            "Beginner": 1,
            "Good start": 2,
            "Moving up": 3,
            "Solid": 4,
            "Good": 5,
            "Nice": 6,
            "Great": 7,
            "Amazing": 8,
            "Flowerful": 9,
            "Genius": 10
        };
        
        const totalPlays = Object.values(spellpetal_ranks).reduce((sum, count) => sum + count, 0);
        const totalRanks = Object.entries(spellpetal_ranks).reduce((sum, [rank, count]) => sum + (rankValues[rank] * count), 0);
        
        if (totalPlays === 0) {
            return "No plays";
        }
    
        const averageRankValue = totalRanks / totalPlays;
        
        let closestRank = null;
        let closestDifference = Infinity;
        for (const [rank, value] of Object.entries(rankValues)) {
            const difference = Math.abs(value - averageRankValue);
            if (difference < closestDifference) {
                closestDifference = difference;
                closestRank = rank;
            }
        }
    
        return closestRank;
    };

    return (
        <div className="stats">
            <div className="stattitle">
                <h2>Statistics</h2>
            </div>
            <div className="stat-line">
                <p>Number of games played:</p>
                <p>{getPlayed()}</p>
            </div>
            <div className="stat-line">
                <p>Average rank:</p>
                <p>{getAverage()}</p>
            </div>
            <br/>
            <div className="stat-section">
                <div className="word-frequencies">
                    <div className="stat-line">
                        <p>Your word</p>
                        <p>% of users found</p>
                    </div>
                    <div className="stat-line">
                        <p>ITALICALLY</p>
                        <p>3%</p>
                    </div>
                    <div className="stat-line">
                        <p>ACYCLICALLY</p>
                        <p>5%</p>
                    </div>
                    <div className="stat-line">
                        <p>IMMIT</p>
                        <p>6%</p>
                    </div>
                    <div className="stat-line">
                        <p>TACTICALLY</p>
                        <p>11%</p>
                    </div>
                    <div className="stat-line">
                        <p>LACTIC</p>
                        <p>15%</p>
                    </div>
                </div>
                <div className="distribution">
                    <p>Rank distribution</p>
                    <div className="bars">
                        {Object.entries(currentUser.spellpetal_ranks).map(([key, value]) => (
                            <div key={key} className="bar" style={{ width: `${barWidths[key] || 7}%` }}>
                                {key}: {value}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}