import PixelCanvas from "../components/PixelCanvas";

const Home = () => {
	return (
		<div className="home">
			<div className="animation-container">
			<PixelCanvas />
			</div>
			<div className="intro">
				<div className="stat-line">
					<p>I made this because I love puzzles</p>
					<p>it's pretty cool</p>
				</div>
				<div className="stat-line">
					<p>Drag your mouse in the space above if you get bored</p>
					<p>Double-click to clear the canvas</p>
				</div>
				<div className="stat-line">
					<p>Developed by Star Rothkopf with React.js, PHP, SQL</p>
					<p>July 2024</p>
				</div>
			</div>
		</div>
	);
}
 
export default Home;