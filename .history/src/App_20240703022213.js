import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import WordleScreen from './components/WordleScreen';
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
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
