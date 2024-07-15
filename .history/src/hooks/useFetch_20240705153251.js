import { useState, useEffect } from 'react';

const usePatch = (url) => { // custom hooks need to start with use
    const baseUrl = "http://localhost:3001";
    const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

    useEffect(() => { // runs every time there is a re-render, every time data changes
        fetch(baseUrl + url, {signal: abortCont.signal})
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
        return () => abortCont.abort(); // aborts fetch when new page navigated
	}, [url]); // dependency array controls when useEffect runs
    return { data, isPending, error }
}

export default usePatch