import { Link } from 'react-router-dom';

const Navbar = (handleLogout) => {
    return (
        <div className="navbar-container">
            <nav className="navbar">
            <h1>PUZZLESTAR</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/wordle">Stardle</Link>
                <Link to="/account">Account</Link>
            </div>
            </nav>
        </div>
    );
}
 
export default Navbar;