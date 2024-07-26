import { Link } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import hasbara from '../assets/hasbara.png';
import intercept from '../assets/intercept.png';
import nywc from '../assets/nywc.png';
import republica from '../assets/republica.png';
import notech from '../assets/notech.png';
import visualizing from '../assets/visualizing.png';
import killer from '../assets/killer.png';
import names from '../assets/names.png';
import maps from '../assets/maps.png';
import dreams from '../assets/dreams.png';

const HomeScreen = () => {
	return (
		<div className="home">
			<div className="about-text">
			<h2>We love games, but not the New York Times.</h2>
			<Marquee size="30" autoFill="true" speed="30"> <div className="marquee">WELCOMETOTHEPEOPLESPUZZLE</div></Marquee>
			<div className="hub">
				<div className="heading">
					<h5>Browse this link hub of Palestine-centered digital projects to find data supporting biased reporting, explore visualizations of the Gazan death toll, and learn more about the role of technology in genocide. </h5>
				</div>
				<div className="projects">
					<a href="https://theintercept.com/2024/01/09/newspapers-israel-palestine-bias-new-york-times/" className="project">
						<div className="img-wrapper">
							<img src={intercept} alt="The Intercept" />
						</div>
						<div className="title">The Intercept</div>
						<div className="description">A quantitative analysis of coverage of War on Gaza in the New York Times.</div>
					</a>
					<a href="https://newyorkwarcrimes.com/" className="project">
						<div className="img-wrapper">
							<img src={nywc} alt="The New York War Crimes" />
						</div>
						<div className="title">The New York War Crimes</div>
						<div className="description">Breaking down The Times' coverage of Israel's most recent war on Gaza. Published by Writers Against the War on Gaza. </div>
					</a>
					<a href="https://visualizingpalestine.org/gaza-names/en.html" className="project">
						<div className="img-wrapper">
							<img src={names} alt="Remember Their Names" />
						</div>
						<div className="title">Remember Their Names</div>
						<div className="description">An interactive research project by Visualizing Palestine. Not updated with recent numbers, but effective nonetheless.</div>
					</a>
					<a href="https://theintercept.com/2024/01/09/newspapers-israel-palestine-bias-new-york-times/" className="project">
						<div className="img-wrapper">
							<img src={hasbara} alt="Hasbara Tracker" />
						</div>
						<div className="title">Hasbara Tracker</div>
						<div className="description">Centralizing information about Israeli disinformation.</div>
					</a>
					<a href="https://stopkiller.ai/" className="project">
						<div className="img-wrapper">
							<img src={killer} alt="Stop Killer AI" />
						</div>
						<div className="title">Stop Killer AI</div>
						<div className="description">An interactive research project by Visualizing Palestine.</div>
					</a>
					<a href="https://palopenmaps.org/en" className="project">
						<div className="img-wrapper">
							<img src={maps} alt="Palestine Open Maps" />
						</div>
						<div className="title">Palestine Open Maps</div>
						<div className="description">Explore, search and download historical maps and spatial data on Palestine. An interactive research project by Visualizing Palestine.</div>
					</a>
					<a href="https://wehaddreams.com/" className="project">
						<div className="img-wrapper">
							<img src={dreams} alt="We Had Dreams" />
						</div>
						<div className="title">We Had Dreams</div>
						<div className="description">Interact with quotes from Palestinians living and dying under siege in Gaza.</div>
					</a>
					<a href="https://www.notechforapartheid.com/" className="project">
						<div className="img-wrapper">
							<img src={notech} alt="No Tech For Apartheid" />
						</div>
						<div className="title">No Tech For Apartheid</div>
						<div className="description">Learn how Amazon and Google's collaboration with Israeli apartheid is part of a larger pattern of Big Tech fueling state violence across the globe. </div>
					</a>
					<a href="https://visualizingpalestine.org/" className="project">
						<div className="img-wrapper">
							<img src={visualizing} alt="Visualizing Palestine" />
						</div>
						<div className="title">Visualizing Palestine</div>
						<div className="description">Using data and research to visually communicate Palestinian experiences.</div>
					</a>
					<a href="https://dukope.com/trt/play.html" className="project">
						<div className="img-wrapper">
							<img src={republica} alt="The Republica Times" />
						</div>
						<div className="title">The Republica Times</div>
						<div className="description">In this award-winning 2012 indie browser game, the player takes the role of the editor of a newspaper torn between personal opposition and vocational obligation.</div>
					</a>
				</div>
			</div>
			<div className="section-2">
				<div className="quote">
					"Technology should be used to bring people together, not facilitate and entrench violence, occupation, and land grabs." - No Tech For Apartheid
				</div>
				<p>
					On April 28th, 2024, Washington University in St. Louis called in police from five departments to brutalize and arrest over 100 students, alumni, and community members while we attempted to establish a Gaza solidarity encampment. Thanks to the library’s free hosting for students, WashU pays the fees that support this site.
				</p>
				<Link to="/pixelcanvas" className="finished">I finished today's puzzles :(</Link>
			</div>
			</div>
		</div>
	);
}
 
export default HomeScreen;