import mac from '../assets/karemac.png';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../hooks/AuthContext';

const AccountScreen = () => {
	const navigate = useNavigate();
	const { currentUser, handleLogout, updateCurrentUser, handleDelete } = useContext(AuthContext);

	const [editingUsername, setEditingUsername] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);

	const [newUsername, setNewUsername] = useState(currentUser?.username || '');
    const [newEmail, setNewEmail] = useState(currentUser?.email || '');
    const [newPassword, setNewPassword] = useState('');

	const handleLogoutAndNavigate = () => {
        handleLogout();
        navigate('/login');
    };

	const handleDeleteAndNavigate = () => {
        handleLogout();
        navigate('/login');
    };

	const handleUpdateUsername = () => {
		const updatedUsername = newUsername.trim();
        fetch(`http://localhost:3001/users/${currentUser["id"]}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
        	body: JSON.stringify({ username: updatedUsername }),
		})
		.then(response => {
			if (response.ok) {
				updateCurrentUser({ ...currentUser, username: updatedUsername });
				setEditingUsername(false);
			} else {
				console.error('Failed to update username');
			}
		})
		.catch(error => console.error('Error updating username:', error));
	};

    const handleUpdateEmail = () => {
		const updatedEmail = newEmail.trim();
        fetch(`http://localhost:3001/users/${currentUser["id"]}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
        	body: JSON.stringify({ email: updatedEmail }),
		})
		.then(response => {
			if (response.ok) {
				updateCurrentUser({ ...currentUser, email: updatedEmail });
				setEditingEmail(false);
			} else {
				console.error('Failed to update email');
			}
		})
		.catch(error => console.error('Error updating email:', error));
	};

    const handleUpdatePassword = () => {
		const updatedPassword = newPassword.trim();
        fetch(`http://localhost:3001/users/${currentUser["id"]}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
        	body: JSON.stringify({ hashed_password: updatedPassword }),
		})
		.then(response => {
			if (response.ok) {
				updateCurrentUser({ ...currentUser, hashed_password: updatedPassword });
				setEditingPassword(false);
			} else {
				console.error('Failed to update password');
			}
		})
		.catch(error => console.error('Error updating password:', error));
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
                    {editingUsername ? (
                        <>
                            <input className="account-input" type="text" defaultValue={currentUser.username} onChange={(e) => setNewUsername(e.target.value)} />
                            <button onClick={handleUpdateUsername}>Save</button>
                            <button onClick={() => setEditingUsername(false)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <p>{currentUser.username}</p>
                            <button onClick={() => setEditingUsername(true)}>Change this?</button>
                        </>
                    )}
				</div>
				<div className="stat-line">
				<p>Email:</p>
                    {editingEmail ? (
                        <>
                            <input className="account-input" type="email" defaultValue={currentUser.email} onChange={(e) => setNewEmail(e.target.value)} />
                            <button onClick={handleUpdateEmail}>Save</button>
                            <button onClick={() => setEditingEmail(false)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <p>{currentUser.email}</p>
                            <button onClick={() => setEditingEmail(true)}>Change this?</button>
                        </>
                    )}
				</div>
				<div className="stat-line">
				<p>Password:</p>
                    {editingPassword ? (
                        <>
                            <input className="account-input" type="password" defaultValue="*****" onChange={(e) => setNewPassword(e.target.value)} />
                            <button onClick={handleUpdatePassword}>Save</button>
                            <button onClick={() => setEditingPassword(false)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <p>secret ^_^</p>
                            <button onClick={() => setEditingPassword(true)}>Change this?</button>
                        </>
                    )}
				</div>
			</div>
			<button className="logout" onClick={handleLogoutAndNavigate}>Log Out</button>
			<button className="delete" onClick={handleDelete}>Delete Account</button>
		</div>
	);
}
 
export default AccountScreen;