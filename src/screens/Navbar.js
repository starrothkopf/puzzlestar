import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../hooks/AuthContext';

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    
    return (
        <div className="navbar-container">
            <nav className="navbar">
            <Link to="/"><h1>PEOPLESPUZZLE</h1></Link>
            <div className="links">
            {currentUser ? (
                <>
                    <Link to="/wordle">Idle</Link>
                    <Link to="/spellpetal">Spell Petal</Link>
                    <Link to="/constellations">Constellations</Link>
                    <Link to="/starcrossed">Mini Crossword</Link>
                    <Link to="/pixelcanvas">Board</Link>
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