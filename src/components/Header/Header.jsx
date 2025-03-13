import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Header.css";
import logo from "../../assets/header__Logo.svg";
import avatar from "../../assets/header__Avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleLoginClick,
  handleRegisterClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const name = currentUser?.name || "Guest";
  const avatar = currentUser?.avatar || null;

  const userInitial = name ? name.charAt(0).toUpperCase() : "?";

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // Return the JSX code for the Header component
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={logo} className="header__logo" alt="Header Logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {/* Conditional UI Based on Login Status  */}
      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-button"
          >
            + Add Clothes
          </button>
          <div className="header__user_container">
            <Link to="/profile" className="header__profile-link">
              <p className="header__username">{name}</p>
            </Link>
            {avatar ? (
              <img src={avatar} alt="User Avatar" className="header__avatar" />
            ) : (
              <div className="header__avatar-placeholder">{userInitial}</div>
            )}
          </div>
        </>
      ) : (
        <>
          <button
            onClick={handleRegisterClick}
            className="header__register-button"
          >
            Sign Up
          </button>
          <button onClick={handleLoginClick} className="header__signin-button">
            Log In
          </button>
        </>
      )}
    </header>
  );
}
// Export the Header component
export default Header;
