import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { AuthContext } from '../AuthContext';

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        <div className="navbar-container">
            <nav className="navbar">
            <h1>PUZZLESTAR</h1>
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