import { useEffect, useState } from "react";


function App() {

  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/solutions')
      .then(res =>)
  },[])

  return (
    <div className="App">
      <h1>Wordle</h1>
    </div>
  );
}

export default App;
