import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle signup logic (POST to your JSON server)
        const response = await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                hashed_password: password, // Assuming you store hashed password in db.json
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
                    <label>
                        
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <br />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label>
                        
                        
                    </label>
                </form>
            </div>
            <div className="bottom-panel">
            <button form="signup-form" type="submit" onClick={handleSubmit}>Sign Up</button>
            </div>
        </div>
    );
};

export default SignUpScreen;