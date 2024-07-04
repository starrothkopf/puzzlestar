import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const handleLogin = () => {
        if (username) {
          onLogin(username);
        }
      };

    return (  );
}
 
export default Login;