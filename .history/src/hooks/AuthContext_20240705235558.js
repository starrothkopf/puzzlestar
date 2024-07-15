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
        setCurrentUser(user);
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete your account and all puzzle stats?")) {
            fetch(`http://localhost:3001/users/${currentUser["id"]}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    console.log('User data deleted successfully');
                    localStorage.removeItem('currentUser');
                    setCurrentUser(null);
                } else {
                    console.error('Failed to delete user data');
                }
            })
            .catch(error => console.error('Error deleting user data:', error));
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, handleLogin, handleLogout, handleDelete }}>
            {children}
        </AuthContext.Provider>
    );
};