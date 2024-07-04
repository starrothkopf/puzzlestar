import React, { useState } from 'react';
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
            <h1>Open sesame</h1>
            <form id>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button className="signup" type="submit" onClick={handleSubmit}>Log In</button>
            </form>
            <button className="tosignup" onClick={() => navigate('/signup')}>Don't have an account?</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default LoginScreen;