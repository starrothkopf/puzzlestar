import { useEffect, useState } from "react";
import Wordle from "../components/Wordle";
import Wordle2 from "../components/Wordle2";

function WordleScreen() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/solutions') // FOR CPANEL: https://star.publish.library.wustl.edu/fetchSolutions.php
      .then(res => res.json())
      .then(json => {
        // FOR CPANEL: const solutions = json.solutions;
        const solutions = json;
        if (solutions && solutions.length > 0) {
          const randomSolution = solutions[Math.floor(Math.random() * solutions.length)];
          setSolution(randomSolution.word);
        }
      })
      .catch(error => {
        console.error('There was a problem fetching the solution:', error);
      });
  }, [setSolution]);

  return (
    <div className="App">
      {solution && <Wordle2 solution=/>}
    </div>
  );
}

export default WordleScreen;
