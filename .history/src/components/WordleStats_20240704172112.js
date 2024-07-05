import React, {useEffect, useState, useContext} from 'react'
import { AuthContext } from '../hooks/AuthContext';

export default function WordleStats({ id }) {
    const [loading, setLoading] = useState(true);
    const { currentUser } = useContext(AuthContext);

    if (loading || !currentUser) {
        return <div>Loading...</div>; 
    }

    const getBarWidth = (value) => {
        if (value === 0) {
            return 7;
        }
        const maxWins = Math.max(currentUser["won_in_1"], currentUser["won_in_2"], currentUser["won_in_3"], currentUser["won_in_4"], currentUser["won_in_5"], currentUser["won_in_6"]);
        return ((value / maxWins) * 100) -1.5;
    };

    const getAverage = () => {
        const totalWins = currentUser["won_in_1"] + currentUser["won_in_2"] + currentUser["won_in_3"] + currentUser["won_in_4"] + currentUser["won_in_5"] + currentUser["won_in_6"];
        const totalGuesses = currentUser["won_in_1"] * 1 + currentUser["won_in_2"] * 2 + currentUser["won_in_3"] * 3 + currentUser["won_in_4"] * 4 + currentUser["won_in_5"] * 5 + currentUser["won_in_6"] * 6;
        if (totalWins === 0) {
            return "0";
        }
        return (totalGuesses / totalWins).toFixed(2);
    };

    return (
        <div className="stats">
            <h2>Statistics</h2>
            <div className="stat-line">
                <p>Number of games played:</p>
                <p>{currentUser["num_played"]}</p>
            </div>
            <div className="stat-line">
                <p>Win percentage:</p>
                <p>{currentUser["win_percentage"]}%</p>
            </div>
            <div className="stat-line">
                <p>Average number of guesses:</p>
                <p>{getAverage()}</p>
            </div>
            <br/>
            <p>Guess distribution</p>
            <div className="bars">
                <div className="bar" style={{ width: `${getBarWidth(currentUser["won_in_2"])}%` }}>2: {stats.won_in_2}</div>
                <div className="bar" style={{ width: `${getBarWidth(currentUser["won_in_3"])}%` }}>3: {stats.won_in_3}</div>
                <div className="bar" style={{ width: `${getBarWidth(currentUser["won_in_4"])}%` }}>4: {stats.won_in_4}</div>
                <div className="bar" style={{ width: `${getBarWidth(currentUser["won_in_1"])}%` }}>5: {stats.won_in_5}</div>
                <div className="bar" style={{ width: `${getBarWidth(currentUser["won_in_1"])}%` }}>6: {stats.won_in_6}</div>
            </div>
        </div>
    )
}