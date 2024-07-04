const AccountScreen = ({currentUser, handleLogout}) => {

	return (
		<div className="account">
			<body>
				Account!
				{currentUser}
			</body>
		</div>
	);
}
 
export default AccountScreen;