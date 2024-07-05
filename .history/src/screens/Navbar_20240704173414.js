import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../hooks/AuthContext';

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    
    return (
        <div className="navbar-container">
            <nav className="navbar">
            <h1>PUZZLESTAR</h1>
            {currentUser && <span>@{currentUser["username"]}</span>}
            <div className="links">
            {currentUser ? (
                <>
                    <Link to="/">Home</Link>
                    <Link to="/wordle">Stardle</Link>
                    <Link to="/constellations">Constellations</Link>
                    <Link to="/account">Account</Link>
                </>
            ) : (
                <>
                </>
            )}
            </div>
            </nav>
        </div>
    );
}
 
export default Navbar;