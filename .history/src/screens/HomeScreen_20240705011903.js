import PixelCanvas from "../components/PixelCanvas";

const Home = () => {
	return (
		<div className="home">
			<p>Welcome to PUZZLESPAR</p>
			<div className="animation-container">
			<PixelCanvas />
			</div>
			<div className="endlabel">
				<p>Developed by Star Rothkopf with React.js, PHP, SQL</p>
				<p>Hosted by Washington University in St. Louis</p>
				<p>Last updated July 2024</p>
			</div>
		</div>
	);
}
 
export default Home;