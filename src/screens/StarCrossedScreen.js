import star from '../assets/star.png';

const StarCrossedScreen = () => {

	return (
		<div className="coming-soon">
			<img src={star} alt="Star" style={{ width: 'auto', height: '100px', opacity: '0.85', margin: '30px'}}/>
			<p>
				Coming Soon: Crossword
			</p>
		</div>
	);
}
 
export default StarCrossedScreen;