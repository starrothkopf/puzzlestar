import mac from '../assets/karemac.png';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../hooks/AuthContext';
import usePatch from '../hooks/usePatch';

var bcrypt = require('bcryptjs');

const AccountScreen = () => {
	const navigate = useNavigate();
	const { currentUser, handleLogout, handleDelete } = useContext(AuthContext);

	const [editingUsername, setEditingUsername] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);

	const [newUsername, setNewUsername] = useState(currentUser?.username || '');
    const [newEmail, setNewEmail] = useState(currentUser?.email || '');
    const [newPassword, setNewPassword] = useState('');

	const { patchData } = usePatch();

	const handleLogoutAndNavigate = () => {
        handleLogout();
        navigate('/login');
    };

	const handleDeleteAndNavigate = () => {
        handleDelete();
        navigate('/login');
    };

	const handleUpdateUsername = async () => {
		const updatedUsername = newUsername.trim();
		await patchData('username', updatedUsername);
	};

    const handleUpdateEmail = async () => {
		const updatedEmail = newEmail.trim();
		await patchData('email', updatedEmail);
	};

    const handleUpdatePassword = async () => {
		const updatedPassword = newPassword.trim();
		const salt = await bcrypt.genSalt(10);
        const hashedUpdatedPassword = await bcrypt.hash(updatedPassword, salt);
		await patchData('hashed_password', hashedUpdatedPassword);
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
			<img src={mac} alt="Susan Kare Happy Mac" style={{ width: '120px', height: 'auto', opacity: '0.85'}}/>
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
			<button className="delete" onClick={handleDeleteAndNavigate}>Delete Account</button>
		</div>
	);
}
 
export default AccountScreen;