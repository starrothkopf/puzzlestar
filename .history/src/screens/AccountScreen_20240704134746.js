import mac from '../assets/karemac.png';
import { useNavigate } from 'react-router-dom';

const AccountScreen = ({currentUser, handleLogout}) => {
	const navigate = useNavigate();

	const handleLogoutAndNavigate = () => {
        handleLogout();
        navigate('/login');
    };

	if (!currentUser) {
		return (
		  <div className="account">
			<body>
			  <p>Please log in to access your account.</p>
			  <button className="login" onClick={() => navigate('/login')}>Log In</button>
			</body>
		  </div>
		);
	  }

	return (
		<div className="account">
			<body>
				Account: {currentUser["username"]}
				<img src={mac} alt="Susan Kare Happy Mac" style={{ width: '185px', height: 'auto', opacity: '0.85'}}/>
				<button onClick={handleLogoutAndNavigate}>Log</button>
			</body>
		</div>
	);
}
 
export default AccountScreen;