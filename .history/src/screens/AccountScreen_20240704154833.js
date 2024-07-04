import mac from '../assets/karemac.png';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const AccountScreen = () => {
	const navigate = useNavigate();
	const { currentUser, handleLogout } = useContext(AuthContext);

	const [editingUsername, setEditingUsername] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);

	const handleLogoutAndNavigate = () => {
        handleLogout();
        navigate('/login');
    };

	const handleUpdateUsername = () => {
        // post to JSON Server
        console.log('Updating username');
    };

    const handleUpdateEmail = () => {
        // Implement logic to update email
        console.log('Updating email');
    };

    const handleUpdatePassword = () => {
        // Implement logic to update password
        console.log('Updating password');
    };

	if (!currentUser) {
		return (
		  <div className="account">
			  <p>Please log in to access your account.</p>
			  <button className="logout" onClick={() => navigate('/login')}>Log In</button>
		  </div>
		);
	  }

	return (
		<div className="account">
			<img src={mac} alt="Susan Kare Happy Mac" style={{ width: '80px', height: 'auto', opacity: '0.85'}}/>
			<div className="account-stats">
				<div className="stat-line">
					<p>Username:</p>
					<p>{currentUser["username"]}</p>
					<button>Change this?</button>
				</div>
				<div className="stat-line">
					<p>Email:</p>
					<p>{currentUser["email"]}</p>
					<button>Change this?</button>
				</div>
				<div className="stat-line">
					<p>Password:</p>
					<p>secret ^_^</p>
					<button>Change this?</button>
				</div>
			</div>
			
			
			<button className="logout" onClick={handleLogoutAndNavigate}>Log Out</button>
		</div>
	);
}
 
export default AccountScreen;