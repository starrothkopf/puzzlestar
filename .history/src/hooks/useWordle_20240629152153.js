import { useState } from 'react';

const useWordle = (solution) => {

    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([]); // guess is an array
    const [history, setHistory] = useState([]); // guess is a string
    const [guesses, setGuesses] = useState([]);

    // format a guess into an array of letter objects
    const formatGuess = () => {

    }
    // add new guess to the guesses state
    const addNewGuess = () => {

    }

    const handleKeyup = () => {

    }

}

export default useWordle