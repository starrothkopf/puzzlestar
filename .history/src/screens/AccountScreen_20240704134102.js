import mac from '../assets/karemac.png';
const AccountScreen = ({currentUser, handleLogout}) => {
	if (!currentUser) {
		return (
		  <div className="account">
			<body>
			  <p>Please log in to access your account.</p>
			</body>
		  </div>
		);
	  }

	return (
		<div className="account">
			<body>
				Account!
				{currentUser["id"]}
				<img src={mac} alt="Susan Kare Happy Mac" style={{ width: '185px', height: 'auto', opacity: '0.85'}}/>
				<button onClick={() => handleLogout()}>Already have an account?</button>
			</body>
		</div>
	);
}
 
export default AccountScreen;