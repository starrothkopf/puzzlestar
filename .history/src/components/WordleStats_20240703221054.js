import React, {useEffect, useState} from 'react'

export default function WordleStats({ id }) {
    const [user, setUser] = useState([]);
    const [stats, setStats] = useState([]);

    useEffect(() => {
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
          })
          .catch(error => {
            console.error('There was a problem fetching users:', error);
          });
      }, [id]); 

    if (!user) {
        return <div>Loading...</div>;
    }

    const getBarWidth = (value) => {
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
            <h2>Your Statistics</h2>
            <span>Number of games played: {stats.num_played}</span>
            <span>{stats.num_played}</span>
            <div className="stat-line">
                <p>Number of games played: {stats.num_played}</p>
                <p>Win percentage: <span className="stat-value">{stats.win_percentage}%</span></p>
            </div>
            <p>Win percentage: {stats.win_percentage}%</p>
            <p>Average number of turns: {getAverage()}</p>
            <p>Wins in a single guess: {stats.won_in_1}</p>
            <p>Guess Distribution:</p>
            <div className="bars">
                <p>2<span className="bar" style={{ width: `${getBarWidth(stats.won_in_2)}%` }}>{stats.won_in_2}</span></p>
                <p>2<span className="bar" style={{ width: `${getBarWidth(stats.won_in_2)}%` }}>{stats.won_in_2}</span></p>
                <div className="bar" style={{ width: `${getBarWidth(stats.won_in_4)}%` }}>{stats.won_in_4}</div>
                <div className="bar" style={{ width: `${getBarWidth(stats.won_in_5)}%` }}>{stats.won_in_5}</div>
                <div className="bar" style={{ width: `${getBarWidth(stats.won_in_6)}%` }}>{stats.won_in_6}</div>
            </div>
        </div>
    )
}