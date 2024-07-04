import mac from '../assets/karemac.png';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const AccountScreen = () => {
	const navigate = useNavigate();
	const { currentUser, handleLogout } = useContext(AuthContext);

	const handleLogoutAndNavigate = () => {
        handleLogout();
        navigate('/login');
    };

	if (!currentUser) {
		return (
		  <div className="account">
			  <p>Please log in to access your account.</p>
			  <button className="login" onClick={() => navigate('/login')}>Log In</button>
		  </div>
		);
	  }

	return (
		<div className="account">
			<h2>{currentUser["username"]}</h2>
			<img src={mac} alt="Susan Kare Happy Mac" style={{ width: '10px', height: 'auto', opacity: '0.85'}}/>
			<button className="signup" onClick={handleLogoutAndNavigate}>Log Out</button>
		</div>
	);
}
 
export default AccountScreen;