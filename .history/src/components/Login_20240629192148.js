import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const handleLogin = () => {
        if (username) {
          onLogin(username);
        }
      };
    return (
        <div>
        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <button onClick={handleLogin}>Login</button>
        </div>
    );
}
 
export default Login;

const authenticateUser = async (username) => {
    const response = await fetch(`http://localhost:3001/users?username=${username}`);
    const users = await response.json();
  
    if (users.length > 0) {
      return users[0];
    } else {
      const newUser = { username, solves: [] };
      const createUserResponse = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      return await createUserResponse.json();
    }
  };