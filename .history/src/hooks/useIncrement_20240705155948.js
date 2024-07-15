import { useState, useEffect } from 'react';

const useIncrement = (url) => { // custom hooks need to start with use
    const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

    useEffect(() => { // runs every time there is a re-render, every time data changes
		const abortCont = new AbortController();

        fetch(url, {signal: abortCont.signal})
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