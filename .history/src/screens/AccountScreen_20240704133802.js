import mac from '../assets/karemac.png';
const AccountScreen = ({currentUser, handleLogout}) => {

	return (
		<div className="account">
			<body>
				Account!
				{currentUser["id"]}
				<img src={mac} alt="Susan Kare Happy Mac" style={{ width: '185px', height: 'auto', opacity: '0.85'}}/>
				
			</body>
		</div>
	);
}
 
export default AccountScreen;