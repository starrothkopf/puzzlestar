import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../hooks/AuthContext';
import star from '../assets/star.png';

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    
    return (
        <div className="navbar-container">
            <nav className="navbar">
            <h1>PUZZLESTAR</h1>
            <img src={star} alt="Star" style={{ width: 'auto', height: 'auto', opacity: '0.85'}}/>
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