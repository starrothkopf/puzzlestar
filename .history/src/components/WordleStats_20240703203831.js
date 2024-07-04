import React, {useEffect, useState} from 'react'

export default function WordleStats({ id }) {
    const [user, setUser] = useState([]);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/users') // https://star.publish.library.wustl.edu/fetchUsers.php
          .then(res => res.json())
          .then(json => {
            // FOR CPANEL: const fetchedLetters = json.letters;
            const fetchedUser = json; 
            if (fetchedUser && fetchedUser.length > 0) {
                setUser(fetchedUser); 
            }
          })
          .catch(error => {
            console.error('There was a problem fetching users:', error);
          });
      }, []); 

    return (
        <div className="stats">
            
        </div>
    )
}