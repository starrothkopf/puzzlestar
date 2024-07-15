import star from '../assets/star.png';
const StarCrossedScreen = () => {

	return (
		<div className="coming-soon">
			<p>
				Coming Soon: Star-Crossed (Crossword clone)
			</p>
			<img src={star} alt="Star" style={{ width: 'auto', height: '80px', opacity: '0.85', margin: '30px'}}/>
		</div>
	);
}
 
export default StarCrossedScreen;