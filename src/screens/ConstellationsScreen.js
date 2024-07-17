import star from '../assets/star.png';
const ConstellationsScreen = () => {

	return (
		<div className="coming-soon">
			<img src={star} alt="Star" style={{ width: 'auto', height: '180px', opacity: '0.85', margin: '30px'}}/>
			<p>
				Coming Soon: Constellations
			</p>
		</div>
	);
}
 
export default ConstellationsScreen;