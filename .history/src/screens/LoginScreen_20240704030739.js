import React, { useState } from 'react';
import mac from 'assets/karemac.png./assets/karemac.png';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Empty fields! Sounds peaceful...');
            return;
        }

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
        <div className="login-container">
            <div className="top-panel">
                <img src={mainLogo} style={nbStyle.logo} alt="fireSpot"/>
                <p>Welcome back</p>
                <form id="login-form">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </form>
            </div>
            <div className="bottom-panel">
                <button className="signup" form="login-form" type="submit" onClick={handleSubmit}>Log In</button>
                <button className="login" onClick={() => navigate('/signup')}>Don't have an account?</button>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default LoginScreen;