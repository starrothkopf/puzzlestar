const Account = () => {

	return (
		<div className="account">
			<body>
				Account!
			</body>
		</div>
	);
}
 
export default Account;


const [letters, setLetters] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/letters') // https://star.publish.library.wustl.edu/fetchLetters.php
          .then(res => res.json())
          .then(json => {
            // FOR CPANEL: const fetchedLetters = json.letters;
            const fetchedLetters = json; 
            if (fetchedLetters && fetchedLetters.length > 0) {
                setLetters(fetchedLetters); 
            }
          })
          .catch(error => {
            console.error('There was a problem fetching letters:', error);
          });
      }, []); 