import { useState } from 'react';

const useWordle = (solution) => {

    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([]); // guess is an array
    const [history, setHistory] = useState([]); // guess is a string
    const [isCorrect, setIsCorrect] = useState(false);

    // format a guess into an array of letter objects
    const formatGuess = () => {

    }
    // add new guess to the guesses state
    const addNewGuess = () => {

    }

    const handleKeyup = ({key}) => {
        if (key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1); // remove last character
            })
        }
        if (/^[A-Za-z]$]/.test(key)) { // regex
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key;
                })
            }
        }
    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyup}

}

export default useWordle