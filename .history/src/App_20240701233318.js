import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";


function App() {

  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch('https://star.publish.library.wustl.edu/php/fetchSolutions.php')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Network response was not ok. Status: ${res.status}`);
        }
        return res.json();
      })
      .then(json => {
        console.log("Fetched JSON:", json); // Log the fetched JSON
        const solutions = json.solutions;
        if (solutions && solutions.length > 0) {
          const randomSolution = solutions[Math.floor(Math.random() * solutions.length)];
          console.log("Selected random solution:", randomSolution); // Log the selected solution
          if (randomSolution && randomSolution.word) {
            setSolution(randomSolution.word);
          } else {
            console.error('Selected solution is invalid:', randomSolution);
          }
        } else {
          console.error('No solutions available');
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
