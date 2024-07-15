import { useEffect, useState } from "react";
import Wordle from "../components/Wordle";
import Wordle2 from "../components/Wordle2";

function WordleScreen() {
  const [solution, setSolution] = useState(null);

  const getTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return Math.floor((midnight - now) / 1000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = getTimeUntilMidnight();
      setCountdown(timeLeft);
      if (timeLeft === 0) {
        setCanPlay(true);
        setShowModal(false);
      }
    }, 1000);

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
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} countdown={countdown} />}
      {solution && <Wordle2 solution={solution} countdown={countdown}/>}
    </div>
  );
}

export default WordleScreen;
