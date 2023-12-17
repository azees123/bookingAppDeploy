import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Make an API call to your server to handle the logout
      await axios.post("/auth/logout");
  
      // Clear user data from the context
      dispatch({ type: "LOGOUT" });
  
      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Log the entire error object for more details
      console.error("Full error object:", error.response.data);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default Logout;
