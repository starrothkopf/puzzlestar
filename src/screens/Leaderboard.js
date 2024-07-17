import star from '../assets/star.png';
const LeaderBoardScreen = () => {

	return (
		<div className="coming-soon">
			<img src={star} alt="Star" style={{ width: 'auto', height: '180px', opacity: '0.85', margin: '30px'}}/>
			<p>
				Coming Soon: Leaderboard
			</p>
		</div>
	);
}
 
export default LeaderBoardScreen;