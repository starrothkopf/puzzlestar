import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import Login from "./components/Login";


function App() {

  const [solution, setSolution] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogin = async (username) => {
    const authenticatedUser = await authenticateUser(username);
    setUser(authenticatedUser);
  };

  useEffect(() => {
    fetch('http://localhost:3001/solutions')
      .then(res => res.json())
      .then(json => {
        const randomSolution = json[Math.floor(Math.random()*json.length)];
        setSolution(randomSolution.word);
      })
  },[setSolution])

  return (
    <div className="App">
      <h1>Stardle</h1>
      {user ? (
        <div>
          <h1>Welcome, {user.username}</h1>
          {/* Your Wordle component */}
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
      
    </div>
  );
}

export default App;
