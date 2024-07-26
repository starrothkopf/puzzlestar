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
import PixelCanvasScreen from './screens/PixelCanvasScreen';
import SpellPetalScreen from './screens/SpellPetalScreen';
import BottomNavbar from './screens/BottomNavbar';
import PrivacyScreen from './screens/PrivacyScreen';
import LeaderBoardScreen from './screens/Leaderboard';

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
                        <Route path="/idle" element={<WordleScreen />} />
                        <Route path="/spellpetal" element={<SpellPetalScreen />} />
                        <Route path="/crossword" element={<StarCrossedScreen />} />
                        <Route path="/constellations" element={<ConstellationsScreen />} />
                        <Route path="/pixelcanvas" element={<PixelCanvasScreen />} />
                        <Route path="/leaderboard" element={<LeaderBoardScreen />} />
                        <Route path="/account" element={<AccountScreen />} />
                        <Route path="/privacy" element={<PrivacyScreen />} />
                        <Route path="/login" element={<LoginScreen/>} />
                        <Route path="/signup" element={<SignUpScreen />} />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                        </Routes>
                    </div>
                    <BottomNavbar currentUser={currentUser}/>
                </div>
		    </Router>
        </AuthProvider>
	);
}

export default App;
