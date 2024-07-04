import React, {useEffect} from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid';
import Keypad from './Keypad';

export default function Wordle({solution}) {
    const {currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys} = useWordle(solution);
    
    useEffect(() => {
        window.addEventListener('keyup', handleKeyup);
        return() => window.removeEventListener('keyup', handleKeyup);
    }, [handleKeyup])
    
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