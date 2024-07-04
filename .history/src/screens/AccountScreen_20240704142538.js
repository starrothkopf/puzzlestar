import mac from '../assets/karemac.png';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const AccountScreen = ({ handleLogout}) => {
	const navigate = useNavigate();
	const { currentUser } = useContext(AuthContext);

	const handleLogoutAndNavigate = () => {
        handleLogout();
        navigate('/login');
    };

	if (!currentUser) {
		return (
		  <div className="account">
			<h1>Account!</h1>
            <p>{currentUser["id"]}</p>
            <img src={mac} alt="Susan Kare Happy Mac" style={{ width: '185px', height: 'auto', opacity: '0.85' }} />
            <button onClick={() => {
                handleLogout();
                navigator('/login');
            }}>Logout</button>
		  </div>
		);
	  }

	return (
		<div className="account">
			<body>
				Account: {currentUser["username"]}
				<img src={mac} alt="Susan Kare Happy Mac" style={{ width: '185px', height: 'auto', opacity: '0.85'}}/>
				<button onClick={handleLogoutAndNavigate}>Log Out</button>
			</body>
		</div>
	);
}
 
export default AccountScreen;