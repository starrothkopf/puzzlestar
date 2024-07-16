import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../hooks/AuthContext';
import star from '../assets/star.png';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { handleLogin } = useContext(AuthContext);

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
        const user = data.find(u => u.username === username);
        
        if (user) {
            var bcrypt = require('bcryptjs');
            const checkHashed = bcrypt.hashSync(password, user.salt);
            if (bcrypt.compareSync(user.hashed_password, checkHashed)) {
                handleLogin(user)
                navigate('/');
            } else {
                alert('Invalid username or password');
            }
        } else {
            alert('Invalid username or password');
            navigate('/signup');
        }
    };

    return (
        <div className="login-container">
            <img src={star} alt="Star" style={{ width: 'auto', height: '80px', opacity: '0.85'}}/>
            <h1>Open sesame</h1>
            <form id="loginform">
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password"value={password} onChange={(e) => setPassword(e.target.value)} />
            </form>
            <button className="tohome" form="login-form" type="submit" onClick={handleSubmit}>Log In</button>
            <button className="tosignup" onClick={() => navigate('/signup')}>Don't have an account?</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default LoginScreen;