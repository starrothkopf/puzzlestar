import { useEffect, useState } from "react";


function App() {

  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/solutions')
      .then(res => res.json())
      .then(json => {
        const randomSolution = json[Math.floor(Math.random()*json.length)]
        setSolution(randomSolution)
      })
  },[])

  return (
    <div className="App">
      <h1>Wordle</h1>
    </div>
  );
}

export default App;
