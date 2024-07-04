import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";


function App() {

  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/solutions') // https://star.publish.library.wustl.edu/fetchLetters.php
      .then(res => res.json())
      .then(json => {
        const solutions = json.solutions;
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
      <h1>Stardle</h1>
      {solution && <Wordle solution={solution}/>}
    </div>
  );
}

export default App;
