import { useState, useEffect } from 'react';
import { AuthContext } from '../hooks/AuthContext';

const useIncrement = (property) => { // custom hooks need to start with use
    const [oldPropertyValues, setoldPropertyValues] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => { // runs every time there is a re-render, every time data changes
        const url = `http://localhost:3001/users/${currentUser["id"]}`;
        
        const response = fetch('http://localhost:3001/users', {
            method: 'GET',
        });
        const data = await response.json();
        const user = data.find(u => u.username === username && u.hashed_password === password);

        fetch(url)
			.then(res => {
				console.log(res);
				if(!res.ok) {
					throw Error('Could not fetch data');
				}
				return res.json();
			})
			.then(data => {
				setData(data);
				setIsPending(false);
				setError(null);
			})
			.catch(e => {
                if (e.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {
                    setIsPending(false);
				setError(e.message);
                }
			})
	}, [url]); // dependency array controls when useEffect runs

    return { data, isPending, error }
}

export default useIncrement