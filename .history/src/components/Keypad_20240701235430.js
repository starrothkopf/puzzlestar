import React, { useEffect, useState } from 'react';

export default function Keypad({usedKeys}) {
    const [letters, setLetters] = useState(null);

    useEffect(() => {
        fetch('https://star.publish.library.wustl.edu/fetchSolutions.php')
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
        <div className="keypad">
            {letters && letters.map((l) => {
                const color = usedKeys[l.key];
                return (
                    <div key={l.key} className={color}>{l.key.toUpperCase()}</div>
                )
            })}
        </div>
    )
}