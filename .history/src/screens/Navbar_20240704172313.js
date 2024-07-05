import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../hooks/AuthContext';

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    
    return (
        <div className="navbar-container">
            <nav className="navbar">
            <h1>PUZZLESTAR</h1>
            <p> </p>
            <p>@{currentUser["username"]}</p>
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