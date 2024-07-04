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

    return (
        <div className="stats">
            <h2>Your Statistics</h2>
            <p>Number of games played: {stats.num_played}</p>
            <p>Win percentage: {stats.win_percentage}%</p>
            <div>{stats.won_in_1}</div>
            <div>{stats.won_in_2}</div>
            <div>{stats.won_in_3}</div>
            <div>{stats.won_in_1}</div>
            <div>{stats.won_in_1}</div>
            <div>{stats.won_in_1}</div>
        </div>
    )
}