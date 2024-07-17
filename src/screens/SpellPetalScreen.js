import star from '../assets/star.png';
const SpellPetalScreen = () => {
	return (
		<div className="coming-soon">
			<p>
				Coming Soon: Make words
			</p>
			<img src={star} alt="Star" style={{ width: 'auto', height: '80px', opacity: '0.85', margin: '30px'}}/>
		</div>
	);
}
 
export default SpellPetalScreen;