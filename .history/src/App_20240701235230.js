import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";


function App() {

  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch('https://star.publish.library.wustl.edu/fetchSolutions.php')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Network response was not OK. Status: ${res.status}`);
        }
        return res.json();
      })
      .then(json => {
        const solutions = json.solutions;
        if (solutions && solutions.length > 0) {
          const randomSolution = solutions[Math.floor(Math.random() * solutions.length)];
  
          if (randomSolution && randomSolution.word) {
            setSolution(randomSolution.word);
          } else {
            console.error('Selected solution is invalid:', randomSolution);
          }
      )
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
