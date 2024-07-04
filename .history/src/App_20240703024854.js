import Navbar from './screens/Navbar';
import HomeScreen from './screens/HomeScreen';
import WordleScreen from './screens/WordleScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<div className="content">
					<Routes> 
						<Route path="/" element={<HomeScreen />}></Route>
						<Route path="/wordle" element={<WordleScreen />}></Route>
                        <Route path="/account" element={<Accou />}></Route>
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
