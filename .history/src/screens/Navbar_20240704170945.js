import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../hooks/AuthContext';

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    
    return (
        <div className="navbar-container">
            <nav className="navbar">
            <h1>PUZZLESTAR</h1>
            <img src={mac} alt="Star" style={{ width: '20px', height: 'auto', opacity: '0.85'}}/>
            <div className="links">
            {currentUser ? (
                <>
                    <Link to="/">Home</Link>
                    <Link to="/wordle">Stardle</Link>
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