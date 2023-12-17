import { useContext } from "react";
import "./navbar.css"
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const {user,dispatch}=useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit",textDecoration:"none"}}>
        <span className="logo">UserBooking</span>
        </Link>
        {user ? (
          <div className="navItems">
            <span>{user.username}</span>
            <button className="navButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <Link to="/register">
              <button className="navButton">Register</button>
            </Link>
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar