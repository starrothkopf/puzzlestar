import React from 'react'
import useWordle from '../hooks/useWordle'

export default function Wordle({solution}) {
    const {currentGuess, handleKeyup} = useWordle(solution)
    return (

    )
}