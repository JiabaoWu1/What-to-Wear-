import { useContext } from "react";
import { Link } from "react-router-dom"; // Capital "L" is correct!
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Header.css";
import logo from "../../assets/header__Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onLogout,
  handleLoginClick,
  handleRegistrationClick
}) {
  // Get user context safely
  const { currentUser } = useContext(CurrentUserContext) || { currentUser: null };

  const name = currentUser?.name || "Guest";
  const avatar = currentUser?.avatar || null;
  const userInitial = name ? name.charAt(0).toUpperCase() : "?";

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={logo} className="header__logo" alt="Header Logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData?.city || "Unknown Location"}
      </p>
      <ToggleSwitch />

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
              <img src={avatar} alt={name} className="header__avatar" />
            ) : (
              <div className="header__avatar header__avatar-placeholder">
                {userInitial}
              </div>
            )}
            <button
              onClick={onLogout}
              type="button"
              className="header__logout-button"
            >
              Log Out
            </button>
          </div>
        </>
      ) : (
        <>
          <button
            onClick={handleRegistrationClick}
            className="header__register-button"
          >
            Sign Up
          </button>
          <button
            onClick={handleLoginClick}
            className="header__signin-button"
          >
            Log In
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
