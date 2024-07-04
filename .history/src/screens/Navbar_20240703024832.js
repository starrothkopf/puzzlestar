import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar-container">
            <nav className="navbar">
            <h1>Star's Puzzles</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/wordle">Wordle</Link>
                <Link to="/account">Wordle</Link>
            </div>
            </nav>
        </div>
    );
}
 
export default Navbar;