import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const LoginScreen = ({}) => {
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
        const user = data.find(u => u.username === username && u.hashed_password === password);

        if (user) {
            handleLogin(user)
            navigate('/');
        } else {
            alert('Invalid username or password');
            navigate('/signup');
        }
    };

    return (
        <div className="login-container">
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