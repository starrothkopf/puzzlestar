import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            try {
                setCurrentUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing stored user:", error);
                localStorage.removeItem('currentUser');
            }
        }
    }, []);

    const handleLogin = (user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log("Stored user in localStorage:", localStorage.getItem('currentUser'));
        console.log("Logged in user:", user);
        setCurrentUser(user);
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};