import React, {useEffect} from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid';
import Keypad from './Keypad';

export default function Wordle({solution}) {
    const {currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys} = useWordle(solution);
    
    useEffect(() => {
        window.addEventListener('keyup', handleKeyup);

        if (isCorrect) {
            
        }

        return() => window.removeEventListener('keyup', handleKeyup);
    }, [handleKeyup, isCorrect])
    
    return (
        <div>
            <Grid 
                currentGuess={currentGuess}
                guesses={guesses}
                turn={turn}
            />
            <Keypad usedKeys={usedKeys}/>
        </div>
    )
}