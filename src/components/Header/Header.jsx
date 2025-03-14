import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Header.css";
import logo from "../../assets/header__Logo.svg";
import avatarPlaceholder from "../../assets/header__Avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleLoginClick,
  handleRegisterClick,
}) {
  // 先获取 context，避免 null 解构报错
  const context = useContext(CurrentUserContext);

  if (!context) {
    console.warn(
      "⚠️ Warning: CurrentUserContext is null. Make sure the provider is correctly set."
    );
    return null; // 直接返回 null，防止渲染时报错
  }

  const { currentUser } = context;
  console.log("Current User:", currentUser); // Debugging log

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

export default Header;
