import React, { useEffect, useState } from 'react';
import Navbar from './screens/Navbar';
import HomeScreen from './screens/HomeScreen';
import WordleScreen from './screens/WordleScreen';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import AccountScreen from './screens/AccountScreen';
import { AuthProvider } from './hooks/AuthContext';
import StarCrossedScreen from './screens/StarCrossedScreen';
import ConstellationsScreen from './screens/ConstellationsScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';

// json-server ./data/db.json --port 3001

function App() {
	const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Check localStorage for current user on app load
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

	return (
        <AuthProvider>
            <Router>
                <div className="App">
                <Navbar currentUser={currentUser}/>
                    <div className="content">
                        <Routes> 
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/wordle" element={<WordleScreen />} />
                        <Route path="/starcrossed" element={<StarCrossedScreen />} />
                        <Route path="/constellations" element={<ConstellationsScreen />} />
                        <Route path="/leaderboard" element={<LeaderboardScreen />} />
                        <Route path="/account" element={<AccountScreen />} />
                        <Route path="/login" element={<LoginScreen/>} />
                        <Route path="/signup" element={<SignUpScreen />} />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                        </Routes>
                    </div>
                </div>
		    </Router>
        </AuthProvider>
	);
}

export default App;
