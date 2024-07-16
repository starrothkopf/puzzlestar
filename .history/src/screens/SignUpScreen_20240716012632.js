import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password || !email) {
            setError('Empty fields! Sounds peaceful...');
            return;
        }

        try {
            var bcrypt = require('bcryptjs');
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = await bcrypt.hashSync(password, salt);

            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    hashed_password: hashedPassword, 
                    salt: salt,
                    email,
                    wordle_lastPlayDate: 0,
                    wordle_lastPlayGuesses: 0,
                    wordle_plays: 0,
                    wordle_wins: 0,
                    wordle_guesses: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0},
                    constellations_lastPlayDate: 0,
                    constellations_plays: 0,
                    constellations_wins: 0,
                    constellations_misses: { "1": 0, "2": 0, "3": 0},
                    starcrossed_lastPlayDate: 0,
                    starcrossed_lastPlaySpeed: 0
                }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const data = await response.json();
            console.log(data);
            navigate('/login');
        } catch (e) {
            setError('Registration failed: ' + e.message);
        }
    };
    return (
        <div className="signup-container">
            <div className="top-panel">
                <h1>Hi</h1>
                <form id="signup-form">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </form>
            </div>
            <div className="bottom-panel">
                <button className="signup" form="signup-form" type="submit" onClick={handleSubmit}>Sign Up</button>
                <button className="login" onClick={() => navigate('/login')}>Already have an account?</button>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default SignUpScreen;