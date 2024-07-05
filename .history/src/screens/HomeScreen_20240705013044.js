import PixelCanvas from "../components/PixelCanvas";

const Home = () => {
	return (
		<div className="home">
			<div className="stat-line">
				<p>Password:</p>
				<input className="account-input" type="password" defaultValue="*****" onChange={(e) => setNewPassword(e.target.value)} />
					<button onClick={handleUpdatePassword}>Save</button>
					<button onClick={() => setEditingPassword(false)}>Cancel</button>
				
				</div>
			<p>Welcome to PUZZLESTAR</p>
			<p>things to do here</p>
			<p>What to do in the sapce below</p>
			<div className="animation-container">
			<PixelCanvas />
			</div>
			<div className="endlabel">
				<p>Developed by Star Rothkopf with React.js, PHP, SQL</p>
				<p>Hosted by Washington University in St. Louis</p>
				<p>July 2024</p>
			</div>
		</div>
	);
}
 
export default Home;