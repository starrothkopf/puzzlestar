export default function Keypad({ usedKeys }) {
    const [letters, setLetters] = useState([]);

    useEffect(() => {
        fetch('https://star.publish.library.wustl.edu/fetchLetters.php')
          .then(res => res.json())
          .then(json => {
            const fetchedLetters = json.letters; // Ensure you're accessing the correct property
            if (fetchedLetters && fetchedLetters.length > 0) {
                setLetters(fetchedLetters); // Update state with fetched letters array
            }
          })
          .catch(error => {
            console.error('There was a problem fetching letters:', error);
          });
      }, []); // Removed setLetters from dependency array to prevent unnecessary re-renders

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