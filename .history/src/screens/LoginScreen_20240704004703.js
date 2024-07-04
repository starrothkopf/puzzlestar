import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/users'); // Replace with your JSON server URL
      const data = await response.json();
      const user = data.find(u => u.username === username && u.hashed_password === password);
      if (user) {
        
        console.log('Login successful');
        <Link to="/">Home</Link>
      } else {
        console.log('Login failed');
        // Handle failed login (e.g., show error message)
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginScreen;