import "../Styles/Navbar.css";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
import { Link } from "react-router-dom";
import LoginModal from "../Components/Login/LoginModal";

function Navbar() {
  const appContext = useContext(AppContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    appContext.setUser(false);
  };

  return (
    <div className="navbar-logged-in">
      {appContext.user ? (
        <span>
          <Link to="/" className="app-label">
            iPet
          </Link>
          <Link to="/" className={`home-button-${appContext.homePageIsActive}`}>
            Home
          </Link>
          <Link
            to="/profile"
            className={`profile-button-${appContext.propfilePageIsActive}`}
          >
            Profile
          </Link>
          {appContext.user.type == "Admin" && (
            <Link
              to="/dashboard"
              className={`dashboard-button-${appContext.adminPageIsActive}`}
            >
              Admin Dashboard
            </Link>
          )}
          <Link to="/" className="logout-button" onClick={handleLogout}>
            Logout [➜
          </Link>
        </span>
      ) : (
        <span className="navbar-logged-out">
          <Link to="/" className="app-label">
            iPet
          </Link>
          <Link to="/" className={`home-button-${appContext.homePageIsActive}`}>
            Home
          </Link>
          <LoginModal />
        </span>
      )}
    </div>
  );
}

export default Navbar;
