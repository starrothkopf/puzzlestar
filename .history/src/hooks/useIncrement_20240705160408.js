import { useState, useEffect } from 'react';
import { AuthContext } from '../hooks/AuthContext';

const useIncrement = (property) => { // custom hooks need to start with use
    const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => { // runs every time there is a re-render, every time data changes
        const baseUrl = `http://localhost:3001/users/${currentUser["id"]}`;
        const url = `${baseUrl}${endpoint}`;
        
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