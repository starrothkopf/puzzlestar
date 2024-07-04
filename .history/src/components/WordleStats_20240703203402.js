export default function WordleStats({ usedKeys }) {
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

    return (
        <div className="keypad">
            {letters.map((l) => {
                const color = usedKeys[l.key];
                return (
                    <div key={l.key} className={color}>{l.key.toUpperCase()}</div>
                )
            })}
        </div>
    )
}