import React, {useEffect} from 'react'
import useWordle from '../hooks/useWordle'

export default function Wordle({solution}) {
    const {currentGuess, handleKeyup} = useWordle(solution);
    
    useEffect(() => {
        window.addEventListener('keyup')
    })
    
    return (
        <div>Wordle</div>
    )
}