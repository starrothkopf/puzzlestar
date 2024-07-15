import PixelCanvas from "../components/PixelCanvas";

const Home = () => {
	return (
		<div className="home">
			<div className="animation-container">
			<PixelCanvas />
			</div>
			<div className="intro">
				<div className="stat-line">
					<p>I love puzzles and fuck the New York Times</p>
					<p>and stole the puzzles from The New York Times</p>
				</div>
				<div className="stat-line">
					<p>Leave mouse-draggings above</p>
					<p>screenshot pièces de résistance</p>
					<p>and double-click to clear the canvas</p>
				</div>
				<div className="stat-line">
					<p>Developed with React.js, PHP, SQL</p>
					<p><a href="https://github.com/starrothkopf/puzzlestar">GitHub</a></p>
				</div>
			</div>
		</div>
	);
}
 
export default Home;