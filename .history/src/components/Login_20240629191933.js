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
        placeholder="Enter username"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
    );
}
 
export default Login;