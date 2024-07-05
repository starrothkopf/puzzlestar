import React, {useEffect, useState, useContext} from 'react'
import { AuthContext } from '../hooks/AuthContext';

export default function WordleStats({ id }) {
    const [user, setUser] = useState([]);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        setLoading(true); 
        fetch('http://localhost:3001/users') // https://star.publish.library.wustl.edu/fetchUsers.php
          .then(res => res.json())
          .then(json => {
            // FOR CPANEL: const fetchedLetters = json.letters;
            const fetchedUser = json.find(user => user.id === id);
            if (fetchedUser) {
                setUser(fetchedUser);
                setStats({
                    num_played: fetchedUser.num_played,
                    win_percentage: fetchedUser.win_percentage,
                    won_in_1: fetchedUser.won_in_1,
                    won_in_2: fetchedUser.won_in_2,
                    won_in_3: fetchedUser.won_in_3,
                    won_in_4: fetchedUser.won_in_4,
                    won_in_5: fetchedUser.won_in_5,
                    won_in_6: fetchedUser.won_in_6,
                });
            }
            setLoading(false);
          })
          .catch(error => {
            console.error('There was a problem fetching users:', error);
            setLoading(false);
          });
      }, [id]); 

    if (loading || !user) {
        return <div>Loading...</div>; 
    }

    const getBarWidth = (value) => {
        if (value === 0) {
            return 7;
        }
        const maxWins = Math.max(stats.won_in_1, stats.won_in_2, stats.won_in_3, stats.won_in_4, stats.won_in_5, stats.won_in_6);
        return ((value / maxWins) * 100) -1.5;
    };

    const getAverage = () => {
        const totalWins = stats.won_in_1 + stats.won_in_2 + stats.won_in_3 + stats.won_in_4 + stats.won_in_5 + stats.won_in_6;
        const totalGuesses = stats.won_in_1 * 1 + stats.won_in_2 * 2 + stats.won_in_3 * 3 + stats.won_in_4 * 4 + stats.won_in_5 * 5 + stats.won_in_6 * 6;
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
                <p>{stats.num_played}</p>
            </div>
            <div className="stat-line">
                <p>Win percentage:</p>
                <p>{stats.win_percentage}%</p>
            </div>
            <div className="stat-line">
                <p>Average number of guesses:</p>
                <p>{getAverage()}</p>
            </div>
            <br/>
            <p>Guess distribution</p>
            <div className="bars">
                <div className="bar" style={{ width: `${getBarWidth(stats.won_in_2)}%` }}>2: {stats.won_in_2}</div>
                <div className="bar" style={{ width: `${getBarWidth(stats.won_in_3)}%` }}>3: {stats.won_in_3}</div>
                <div className="bar" style={{ width: `${getBarWidth(stats.won_in_4)}%` }}>4: {stats.won_in_4}</div>
                <div className="bar" style={{ width: `${getBarWidth(stats.won_in_5)}%` }}>5: {stats.won_in_5}</div>
                <div className="bar" style={{ width: `${getBarWidth(stats.won_in_6)}%` }}>6: {stats.won_in_6}</div>
            </div>
        </div>
    )
}