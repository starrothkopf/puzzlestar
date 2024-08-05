import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../hooks/AuthContext';
import usePatch from '../hooks/usePatch';

const useSpellPetal = (letters, center) => {
	const [currentGuess, setCurrentGuess] = useState('');
	const { currentUser } = useContext(AuthContext);
  const [validGuesses, setValidGuesses] = useState(currentUser.spellpetal_wordsFoundToday);
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");
  const [hasWon, setHasWon] = useState(false);
  const [maxScore, setMaxScore] = useState(0);
	const [rank, setRank] = useState("Beginner");
  const [solutions, setSolutions] = useState([]);
	const [solutionsWithoutCenter, setSolutionsWithoutCenter] = useState([]);
	const { patchData } = usePatch();

  const calculateWordScore = (word) => {
    return word.length;
  };
	
	useEffect(() => {
		const fetchDataAndCalculateSolutions = async () => {
				try {
					const response = await fetch('/words_alpha.txt');
					const text = await response.text();
					const wordList = text.split('\n').map(word => word.toLowerCase().trim());
					const calculatedSolutions = calculateSolutionsList(letters.toLowerCase(), center.toLowerCase(), wordList);
					const calculatedSolutionsWithoutCenter = calculateSolutionsListWithoutCenter(letters.toLowerCase(), center.toLowerCase(), wordList);
					setSolutions(calculatedSolutions);
					setSolutionsWithoutCenter(calculatedSolutionsWithoutCenter);
				} catch (error) {
						console.error('Error:', error);
				}
		};
		fetchDataAndCalculateSolutions();
}, [letters, center]);

useEffect(() => {
	const calculateMaxScore = () => {
			const scores = solutions.map(word => calculateWordScore(word));
			setMaxScore(scores.reduce((a, b) => a + b, 0));
	};
	if (solutions.length > 0) calculateMaxScore();
}, [solutions]);

	useEffect(() => {
    const percentageFound = score / maxScore;
    let newRank = "Beginner";
    for (const [key, value] of Object.entries(ranks)) {
        if (percentageFound >= value) {
            newRank = key;
        }
    }
    if (rank !== newRank) {
        setRank(newRank);
        patchData('spellpetal_ranks', {
            ...currentUser.spellpetal_ranks,
            [newRank]: currentUser.spellpetal_ranks[newRank] + 1
        }).catch(error => console.error('Failed to update rank:', error));
    }
}, [score, maxScore, rank, patchData, currentUser.spellpetal_ranks]);

  // add a new guess to the guesses state
  // update the hasWon state if the guess is correct
  // add word score to total score
  const addNewGuess = async (word) => {
		const wordScore = calculateWordScore(word);
		if (score + wordScore === maxScore) {
			setHasWon(true);
		}
		setValidGuesses((prevGuesses) => {
			const newGuesses = [...prevGuesses, word];
			patchData('spellpetal_wordsFoundToday', newGuesses)
				.catch(error => console.error('Failed to update words:', error));
			return newGuesses;
		});
		setCurrentGuess('');
	};

	// calculate score
	useEffect(() => {
		const totalScore = calculateTotalScore(currentUser.spellpetal_wordsFoundToday);
		setScore(totalScore);
	}, [currentUser.spellpetal_wordsFoundToday]);

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
		setError("");
    if (key === 'Enter') {
			if (score === maxScore) {
				return
			}
			if (validGuesses.includes(currentGuess)) {
				setError("Already guessed")
				return
			} else if (!solutionsWithoutCenter.includes(currentGuess)) {
        setError('Not a valid word :(');
        return;
			} else if (currentGuess.length < 4) {
				setError('Too short');
        return;
      } else if (!solutions.includes(currentGuess)) {
				setError('Include center letter');
        return;
			} 
			addNewGuess(currentGuess)
    } else if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (/^[A-Za-z]$/.test(key)) {
      setCurrentGuess((prev) => prev + key.toLowerCase());
    }
  }
	return {score, maxScore, error, currentGuess, validGuesses, rank, hasWon, handleKeyup}
}

export default useSpellPetal

const calculateSolutionsList = (letters, center, dictionary) => {
  const allLetters = letters + center;
  const pattern = new RegExp(`^[${allLetters}]+$`);
  return dictionary.filter(word => {
    if (word.length < 4) return false;
    if (!pattern.test(word)) return false;
    if (!word.includes(center)) return false;
    return true;
  });
};

const calculateSolutionsListWithoutCenter = (letters, center, dictionary) => {
  const allLetters = letters + center;
  const pattern = new RegExp(`^[${allLetters}]+$`);
  return dictionary.filter(word => {
    if (word.length < 4) return false;
    if (!pattern.test(word)) return false;
    return true;
  });
};

const ranks = { // text displayed: % of solutions user finds
	"Beginner": 0, 
	"Good start":0.01,
	"Moving up":0.02,
	"Good":0.05,
	"Solid":0.08,
	"Nice":0.15,
	"Great":0.25,
	"Amazing":0.40,
	"Genius":0.50,
	"Flowerful": 1,
};

const calculateTotalScore = (words) => {
	return words.reduce((total, word) => total + word.length, 0);
};