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

        const response = await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                hashed_password: password, 
                email,
                salt: "",
                last_play_time_wordle: 0,
                num_played_wordle: 0,
                num_wins_wordle: 0,
                won_in_1: 0,
                won_in_2: 0,
                won_in_3: 0,
                won_in_4: 0,
                won_in_5: 0,
                won_in_6: 0,
                last_play_time_constellations: 0,
                last_play_constellations: 0,
                num_played_constellations: 0,
                num_wins_constellations: 0,
                last_play_time_starcrossed: 0,

                
                    username": "stark0pf",
                    "hashed_password": "12345",
                    "email": "rothkopfstar@gmail.com",
                    "salt": "",
                    "wordle_lastPlayDate": "1720298370729",
                    "wordle_plays": 185,
                    "wordle_wins": 179,
                    "wordle_guesses": { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0},
                    "constellations_lastPlayDate": 0,
                    "constellations_plays": 82,
                    "constellations_wins": 75,
                    "constellations_misses": { "1": 0, "2": 0, "3": 0},
                    "starcrossed_lastPlayDate": 0
                  
            }),
        });
        const data = await response.json();
        console.log(data); 
        navigate('/login');
    };

    return (
        <div className="signup-container">
            <div className="top-panel">
                <h1>Get Puzzled</h1>
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