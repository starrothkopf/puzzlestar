import React, { useEffect, useState } from 'react';

export default function Keypad() {
    const [letters, setLetters] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/letters')
        .then(res => res.json())
    })

    return (
        <div>Keypad</div>
    )
}