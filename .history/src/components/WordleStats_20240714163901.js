import React, { useContext } from 'react'
import { AuthContext } from '../hooks/AuthContext';

export default function WordleStats({ id }) {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return <div>Loading...</div>; 
    }

    const getBarWidth = (value) => {
        if (value === 0) {
            return 7;
        }
        const maxWins = Math.max(...Object.values(currentUser.wordle_guesses));
        return ((value / maxWins) * 100) -1.5;
    };

    const getAverage = () => {
        const totalWins = Object.values(wordle_guesses).reduce((sum, count) => sum + count, 0);
        const totalGuesses = Object.entries(wordle_guesses).reduce((sum, [key, count]) => sum + (parseInt(key) * count), 0);
        if (totalWins === 0) {
            return "0";
        }
        return (totalGuesses / totalWins).toFixed(2);
    };

    const getWinPercentage = () => {
        if (currentUser["wordle_plays"] === 0) {
            return 100;
        }
        return ((currentUser.wordle_wins / currentUser.num_played_wordle) * 100).toFixed(1);
    }

    return (
        <div className="stats">
            <h2>Statistics</h2>
            <div className="stat-line">
                <p>Number of games played:</p>
                <p>{currentUser["num_played_wordle"]}</p>
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
                <div className="bar" style={{ width: `${getBarWidth(currentUser["won_in_2"])}%` }}>2: {currentUser["won_in_2"]}</div>
                <div className="bar" style={{ width: `${getBarWidth(currentUser["won_in_3"])}%` }}>3: {currentUser["won_in_3"]}</div>
                <div className="bar" style={{ width: `${getBarWidth(currentUser["won_in_4"])}%` }}>4: {currentUser["won_in_4"]}</div>
                <div className="bar" style={{ width: `${getBarWidth(currentUser["won_in_5"])}%` }}>5: {currentUser["won_in_5"]}</div>
                <div className="bar" style={{ width: `${getBarWidth(currentUser["won_in_6"])}%` }}>6: {currentUser["won_in_6"]}</div>
            </div>
        </div>
    )
}