
const AccountScreen = ({currentUser, handleLogout}) => {

	return (
		<div className="account">
			<body>
				Account!
				{currentUser}
				<img src={mac} alt="Susan Kare Happy Mac" style={{ width: '185px', height: 'auto', opacity: '0.85'}}/>
			</body>
		</div>
	);
}
 
export default AccountScreen;