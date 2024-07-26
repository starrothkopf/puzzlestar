const PrivacyScreen = () => {

	return (
		<div className="info">
			<h1>Puzzlers' Privacy ⁂</h1>
			<p>This website securely collects the following information in order to offer account recovery and game statistics:</p>
			<ul>
				<li>Username</li>
				<li>Email address</li>
				<li>Date of most recent play</li>
				<li>All play scores</li>
			</ul>
			<p>Your browser's LocalStorage is used to store a persistent token which is used for login sessions. This token is deleted when you log out.</p>
			<p>Your password is never stored in plain text. Bcrypt is a robust, industry-standard algorithm used to hash and salt your password before storage.</p>
			<p>When your account is deleted, all of the data related to your account will also be deleted, including your profile information and gameplay data.</p>
		</div>
	);
}
 
export default PrivacyScreen;