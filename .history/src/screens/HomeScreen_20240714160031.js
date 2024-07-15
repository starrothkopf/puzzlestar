import PixelCanvas from "../components/PixelCanvas";

const Home = () => {
	return (
		<div className="home">
			<div className="animation-container">
			<PixelCanvas />
			</div>
			<div className="intro">
				<div className="stat-line">
					<p>I love puzzles so I made this website</p>
					<p>and stole the puzzles from The New York Times</p>
				</div>
				<div className="stat-line">
					<p>Leave mouse-draggings above</p>
					<p>Leave mouse-draggings above</p>
					<p>and double-click to clear the canvas</p>
				</div>
				<div className="stat-line">
					<p>Developed with React.js, PHP, SQL</p>
					<p>GitHub</p>
					<p>Privacy</p>
					<p>Terms of Service</p>
				</div>
			</div>
		</div>
	);
}
 
export default Home;