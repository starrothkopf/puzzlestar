const Home = () => {
	const numCards = 3;
	const cards = Array.from({ length: numCards }, (v, i) => i);

	return (
		<div className="home">
			<div className="animation-container">
				<div class="container">
				<div class="square black">
				<div class="square">
				<div class="square black">
				<div class="square">
				<div class="square black">
				<div class="square">
				<div class="square black">
				<div class="square">
				<div class="square black">
				<div class="square">
				<div class="square black">
				<div class="square">
				<div class="square black">
				<div class="square">
				<div class="square black">
				<div class="square">
				<div class="square black">
				<div class="square">
				<div class="square black">
				<div class="square">
				<div class="square black">
				<div class="square">
				<div class="square black">
				<div class="square">
				<div class="square black">
				<div class="square">
				<div class="square black">
				<div class="square">
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
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