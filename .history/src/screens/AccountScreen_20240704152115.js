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
			<div className="stat-line">
                <p>Username:</p>
                <p>{currentUser["username"]}</p>
				<p>Change this?</p>
            </div>
			<div className="stat-line">
                <p>Email:</p>
                <p>{currentUser["email"]}</p>
				<p>Change this?</p>
            </div>
			<div className="stat-line">
                <p>Password:</p>
                <p>secret :3</p>
				<p>Change this?</p>
            </div>
			<div className="stat-line">
                <p></p>
                <p></p>
				<<button className="signup" onClick={handleLogoutAndNavigate}>Log Out</button></p>
            </div>
			
			<img src={mac} alt="Susan Kare Happy Mac" style={{ width: '50px', height: 'auto', opacity: '0.85'}}/>
		</div>
	);
}
 
export default AccountScreen;