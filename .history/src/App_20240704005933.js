import React, { useEffect, useState } from 'react';
import Navbar from './screens/Navbar';
import HomeScreen from './screens/HomeScreen';
import WordleScreen from './screens/WordleScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Account from './screens/AccountScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

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

	const handleLogout = () => {
        // Remove current user from localStorage on logout
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
        // Redirect to login page or home page after logout
        navigator('/login');
    };

	return (
		<Router>
			<div className="App">
			<Navbar currentUser={currentUser} handleLogout={handleLogout} />
				<div className="content">
					<Routes> 
						<Route path="/" element={<HomeScreen />}></Route>
						<Route path="/account" element={<AccountScreen currentUser={currentUser} />} />
                        <Route path="/account" element={<AccountScreen currentUser={currentUser} />} />
						<Route path="/login" element={<LoginScreen />} />
                        <Route path="/signup" element={<SignUpScreen />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
