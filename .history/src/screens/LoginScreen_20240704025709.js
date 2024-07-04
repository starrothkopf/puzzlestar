import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/users', {
            method: 'GET',
        });
        const data = await response.json();
        const user = data.find(u => u.username === username && u.hashed_password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            navigate('/');
        } else {
            alert('Invalid username or password');
            navigate('/signup');
        }
    };

    return (
        <div className="signup-container">
            <div className="top-panel">
                <h2>Get Puzzled</h2>
                <form id="login-form">
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

export default LoginScreen;