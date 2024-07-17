import { Link } from 'react-router-dom';

const HomeScreen = () => {
	return (
		<div className="home">
			<div className="about-text">
				<h2>Welcome</h2>
				<p>I love puzzles but NYT has been atrocious</p>
				<p>Hosting for this website is paid for by Washington University in St. Louis which doesn't pay taxes and violently arrested my friends soo wrack up those accounts</p>
				<p>Archive of pro-Palestine digital projects</p>
			</div>
			
			<Link to="/pixelcanvas">I finished all of today's games :(</Link>
		</div>
	);
}
 
export default HomeScreen;