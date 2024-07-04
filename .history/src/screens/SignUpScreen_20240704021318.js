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
            setError('All fields are required.');
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
                num_played: 0,
                win_percentage: 0,
                won_in_1: 0,
                won_in_2: 0,
                won_in_3: 0,
                won_in_4: 0,
                won_in_5: 0,
                won_in_6: 0,
            }),
        });
        const data = await response.json();
        console.log(data); // Log response for debugging

        // Redirect to login page after signup
        navigate('/');
    };

    return (
        <div className="signup-container">
            <div className="top-panel">
                <h2>Get Puzzled</h2>
                <form id="signup-form">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </form>
            </div>
            <div className="bottom-panel">
            <button form="signup-form" type="submit" onClick={handleSubmit}>Sign Up</button>
            </div>
        </div>
    );
};

export default SignUpScreen;