import { useEffect, useState } from "react";
import SpellPetal from "../components/SpellPetal";

function SpellPetalScreen() {
  const [letters, setLetters] = useState(null);
  const [center, setCenter] = useState(null);

  useEffect(() => {
    const now = Date.now();
    const epochDate = Math.floor(now / (24 * 60 * 60 * 1000));

    fetch('http://localhost:3001/spellpetal-solutions') // FOR CPANEL: https://star.publish.library.wustl.edu/fetchSolutions.php
      .then(res => res.json())
      .then(json => {
        // FOR CPANEL: const solutions = json.solutions;
        const solutions = json;
        if (solutions && solutions.length > 0) {
          const index = epochDate % solutions.length;
          setLetters(solutions[index].letters);
		  setCenter(solutions[index].center);
        }
      })
      .catch(error => {
        console.error('There was a problem fetching the letters:', error);
      });
  }, [setLetters, setCenter]);

  return (
    <div className="App">
      {letters && <SpellPetal letters={letters} center={center}/>}
    </div>
  );
}

export default SpellPetalScreen;
