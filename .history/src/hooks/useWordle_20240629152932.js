import { useState } from 'react';
import Wordle from './components/Wordle'

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

    const handleKeyup = ({}) => {

    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyup}

}

export default useWordle