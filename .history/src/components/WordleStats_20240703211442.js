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
        return (value / maxWins) * 100;
    };

    const getAverage = () => {
        const totalWins = stats.won_in_1 + stats.won_in_2 + stats.won_in_3 + stats.won_in_4 + stats.won_in_5 + stats.won_in_6;
        const totalGuesses = stats.won_in_1 * 1 + stats.won_in_2 * 2 + stats.won_in_3 * 3 + stats.won_in_4 * 4 + stats.won_in_5 * 5 + stats.won_in_6 * 6;
        return (totalGuesses / totalWins).toFixed(2);
    };

    return (
        <div className="stats">
            <h2>Your Statistics</h2>
            <p>Number of games played: {stats.num_played}</p>
            <p>Win percentage: {stats.win_percentage}%</p>
            <p>Average guess: {getAverage()}</p>
            <div style={{ width: `${getBarWidth(stats.won_in_1)}%` }}>{stats.won_in_1}</div>
            <div style={{ width: `${getBarWidth(stats.won_in_2)}%` }}>{stats.won_in_2}</div>
            <div style={{ width: `${getBarWidth(stats.won_in_3)}%` }}>{stats.won_in_3}</div>
            <div style={{ width: `${getBarWidth(stats.won_in_4)}%` }}>{stats.won_in_4}</div>
            <div style={{ width: `${getBarWidth(stats.won_in_5)}%` }}>{stats.won_in_5}</div>
            <div style={{ width: `${getBarWidth(stats.won_in_6)}%` }}>{stats.won_in_6}</div>
        </div>
    )
}