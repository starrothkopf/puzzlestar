import React, { useState } from 'react';

export default function Poppy({ letters, center }) {
    const [shuffledLetters, setShuffledLetters] = useState(() => {
        const initialLetters = [...letters];
        initialLetters.splice(Math.floor(initialLetters.length / 2), 0);
        return initialLetters;
    });

    const shuffleArray = (array) => { // fisher-yates algorithm
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    };

    const handleClick = () => {
        const lettersWithCenter = [...letters];
        lettersWithCenter.splice(Math.floor(lettersWithCenter.length / 2), 0);
        const shuffled = shuffleArray(lettersWithCenter);
        setShuffledLetters(shuffled);
    };

    const petalSpacing = window.innerHeight * 0.17;
  
    return (
        <div className="poppy">
            {shuffledLetters.map((letter, index) => (
                <div
                    key={index}
                    className={`petal ${index === Math.floor(shuffledLetters.length / 2) ? 'center' : ''}`}
                    style={{
                        transform: `rotate(${(360 / shuffledLetters.length) * index}deg) translateX(${petalSpacing}px) rotate(-${(360 / shuffledLetters.length) * index}deg)`,
                        position: 'absolute',
                        textAlign: 'center'
                    }}
                >
                    {letter.toUpperCase()}
                </div>
            ))}
            <div className="center-letter">
                {center.toUpperCase()}
            </div>
            <button className="shuffle" onClick={handleClick}>Shuffle</button>
        </div>
        
    );
  }