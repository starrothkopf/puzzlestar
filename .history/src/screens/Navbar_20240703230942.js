import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar-container">
            <nav className="navbar">
            <h1>PUZZLESTAR </h1>
            <span>✶</span>
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