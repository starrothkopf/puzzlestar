import React, { useEffect, useState } from 'react';

export default function Keypad({usedKeys}) {
    const [letters, setLetters] = useState(null);

    useEffect(() => {
        fetch('https://star.publish.library.wustl.edu/fetchLetters.php')
          .then(res => res.json())
          .then(json => {
            const letters = json.letters;
            if (letters && letters.length > 0) {
                setLetters(json);
                const randomSolution = solutions[Math.floor(Math.random() * solutions.length)];
              setSolution(randomSolution.word);
            }
          })
          .catch(error => {
            console.error('There was a problem fetching the solution:', error);
          });
      }, [setSolution]);

    useEffect(() => {
        fetch('https://star.publish.library.wustl.edu/fetchLetters.php')
            .then(res => {
                if (!res.ok) {
                  throw new Error('Network response was not ok. Status:', res.status); 
                }
                return res.json();
              })
            .then(json => {
                setLetters(json)
        }).catch(error => {
            console.error('There was a problem fetching letters:', error);
          });
    })

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