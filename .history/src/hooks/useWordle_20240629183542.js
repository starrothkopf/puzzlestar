import { useState } from 'react'

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0) 
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
  const [history, setHistory] = useState([]) // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false)
	const [usedKeys, setUsedKeys] = useState({})

  // format a guess into an array of letter objects 
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    let solutionArray = [...solution]; // string to array
		let formattedGuess = [...currentGuess].map((l) => {
			return {key: l, color: 'grey'};
		});

		formattedGuess.forEach((l, i) => { 
			if (solutionArray[i] === l.key) {
				formattedGuess[i].color = 'green';
				solutionArray[i] = null; // prevents double matching
			}
		});

		formattedGuess.forEach((l, i) => { 
			if (solutionArray.includes(l.key) && l.color !== 'green') {
				formattedGuess[i].color = 'yellow';
				solutionArray[solutionArray.indexOf(l.key)] = null;
			}
		});

		return formattedGuess;
  }

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
		if (currentGuess === solution) {
			setIsCorrect(true);
		}
		setGuesses((prevGuesses) => {
			let newGuesses = [...prevGuesses];
			newGuesses[turn] = formattedGuess;
			return newGuesses;
		})
		setHistory((prevHistory) => {
			return [...prevHistory, currentGuess];
		})
		setTurn((prevTurn) => {
			return prevTurn + 1;
		})
		setUsedKeys((prevUsedKeys) => {
			let newKeys = {...prevUsedKeys};
			formattedGuess.forEach((l) => {
				const currentColor = newKeys[l.key];
				if (l.color === 'green') {
					newKeys[l.key] = 'green';
					return
				}
				if (l.color === 'green') {
					newKeys[l.key] = 'green';
					return
				}

			})

		})
		setCurrentGuess('');
  }

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
    if (key === 'Enter') {
			if (turn > 5) {
				return
			}
			if (history.includes(currentGuess)) {
				return
			}
			if (currentGuess.length !== 5) {
				return
			}
			const formatted = formatGuess();
			addNewGuess(formatted);
    }
    if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1))
      return
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess(prev => prev + key)
      }
    }
  }

  return {turn, currentGuess, guesses, isCorrect, handleKeyup}
}

export default useWordle