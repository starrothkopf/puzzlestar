import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../hooks/AuthContext';

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    
    return (
        <div className="navbar-container">
            <nav className="navbar">
                <Link to="/"><h1>PUZZLESTAR</h1></Link>
                <div className="links">
                {currentUser ? (
                    <>
                        <Link to="/idle" className="link-idle">Stardle</Link>
                        <Link to="/spellpetal" className="link-spellpetal">Stellar Speller</Link>
                        <Link to="/crossword" className="link-starcrossed">Star Crossed</Link>
                        <Link to="/pixelcanvas" className="link-pixelcanvas">Board</Link>
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