import star from '../assets/star.png';
const ConstellationsScreen = () => {

	return (
		<div className="coming-soon">
			<p>
				Coming Soon: Group words
			</p>
			<img src={star} alt="Star" style={{ width: 'auto', height: '80px', opacity: '0.85', margin: '30px'}}/>
		</div>
	);
}
 
export default ConstellationsScreen;