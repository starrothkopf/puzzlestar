import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../hooks/AuthContext';

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    
    return (
        <div className="navbar-container">
            <nav className="navbar">
                <Link to="/"><h1>THEPEOPLESPUZZLE</h1></Link>
                <div className="links">
                {currentUser ? (
                    <>
                        <Link to="/idle" className="link-idle">Idle</Link>
                        <Link to="/spellpetal" className="link-spellpetal">Spell Petal</Link>
                        <Link to="/constellations" className="link-constellations">Constellations</Link>
                        <Link to="/crossword" className="link-starcrossed">Crosswords</Link>
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