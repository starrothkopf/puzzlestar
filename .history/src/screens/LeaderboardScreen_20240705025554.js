import star from '../assets/star.png';
const LeaderboardScreen = () => {

	return (
		<div className="coming-soon">
			<p>
				Coming Soon: Leaderboard
			</p>
            <img src={star} alt="Star" style={{ width: 'auto', height: '80px', opacity: '0.85', margin: '30px'}}/>
		</div>
	);
}
 
export default LeaderboardScreen;