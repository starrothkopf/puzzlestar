import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";


function App() {

  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/solutions') // https://star.publish.library.wustl.edu/fetchSolutions.php
      .then(res => res.json())
      .then(json => {
        console.log("meow");
        const solutions = json.solutions;
        console.log("solutions:");
        console.log("solutions length:");
        if (solutions && solutions.length > 0) {
          console.log("woof");
          const randomSolution = solutions[Math.floor(Math.random() * solutions.length)];
          console.log("Setting solution", randomSolution.word);
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
