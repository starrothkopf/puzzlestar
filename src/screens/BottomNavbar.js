import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../hooks/AuthContext';

const BottomNavbar = () => {
    const { currentUser } = useContext(AuthContext);
    
    return (
        <div className="navbar-container">
            <nav className="bottom-navbar">
                <div className="bottom-links">
                {currentUser ? (
                    <>
                        <Link to="/">About</Link>
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/tos">Terms of Service</Link>
                        <Link to="/account">My Account</Link>
                    </>
                ) : (
                    <>
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/tos">Terms of Service</Link>
                    </>
                )}
            </div>
            </nav>
        </div>
    );
}
 
export default BottomNavbar;