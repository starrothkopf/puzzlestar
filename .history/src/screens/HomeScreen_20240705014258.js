import PixelCanvas from "../components/PixelCanvas";

const Home = () => {
	return (
		<div className="home">
			<div className="animation-container">
			<PixelCanvas />
			</div>
			<div className="intro">
				<div className="stat-line">
					<p>Drag your mouse above</p>
					<p>if you get bored</p>
					<p>double-click to clear</p>
				</div>
				<div className="stat-line">
					<p>Welcome to PUZZLESTAR</p>
					<p>things to do here</p>
					<p>it's pretty cool</p>
				</div>
				<div className="stat-line">
					<p>Developed by Star Rothkopf</p>
					<p>React</p>
					<p>it's pretty cool</p>
				</div>
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