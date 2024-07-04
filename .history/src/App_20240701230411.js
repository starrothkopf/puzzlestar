import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";


function App() {

  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch('https://star.publish.library.wustl.edu/fetchSolutions.php')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok'); 
        } else (res.) {

        }
        return res.json();
      })
      .then(json => {
        const randomSolution = json[Math.floor(Math.random()*json.length)];
        setSolution(randomSolution.word);
      }).catch(error => {
        console.error('There was a problem fetching the solution:', error);
      });
  },[setSolution])

  return (
    <div className="App">
      <h1>Stardle</h1>
      {solution && <Wordle solution={solution}/>}
    </div>
  );
}

export default App;
