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
					<p>and stole puzzles from The New York Times</p>
				</div>
				<div className="stat-line">
					<p>Drag your mouse in the space above if you get bored in a lecture</p>
					<p>and double-click to clear the canvas</p>
				</div>
				<div className="stat-line">
					<p>Screenshot pivotal & prodigious mouse-draggings</p>
					<p>and send them to me :)</p>
				</div>
				<div className="stat-line">
					<p>Developed by Star Rothkopf with React.js & PHP & SQL</p>
					<p>and hosted by Washington University in St. Louis libraries</p>
				</div>
			</div>
		</div>
	);
}
 
export default Home;