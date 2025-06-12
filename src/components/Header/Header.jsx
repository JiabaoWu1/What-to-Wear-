import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Header.css";
import logo from "../../assets/header__Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import ProfileSidebar from "../ProfileSidebar/ProfileSidebar";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onLogout,
  handleLoginClick,
  handleRegistrationClick,
  setActiveModal
}) {
  const { currentUser } = useContext(CurrentUserContext) || { currentUser: null };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const name = currentUser?.name || "Guest";
  const avatar = currentUser?.avatar || null;

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <header className="header">
        <Link to="/" className="header__link">
          <img src={logo} className="header__logo" alt="Header Logo" />
        </Link>

        <p className="header__date-and-location">
          {currentDate}, {weatherData?.city || "Unknown Location"}
        </p>

        <div className="header__profile-bar">
          <ToggleSwitch />
          {isLoggedIn && (
            <>
              <span
                className="header__add-clothes"
                onClick={handleAddClick}
                tabIndex={0}
                role="button"
              >
                + Add clothes
              </span>
              <span className="header__username">{name}</span>
              <Link to="/profile" className="header__link" style={{ fontWeight: 500, marginLeft: 10 }}>
        Profile
      </Link>
              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                  className="header__avatar-img"
                  style={{ marginLeft: "12px", cursor: "pointer" }}
                  onClick={() => setSidebarOpen(true)}
                />
              ) : (
                <div
                  className="header__avatar-placeholder"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "#bbb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "12px",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    color: "#fff",
                    cursor: "pointer"
                  }}
                  onClick={() => setSidebarOpen(true)}
                >
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
              {/* Log Out button REMOVED from here! */}
            </>
          )}
          {!isLoggedIn && (
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
        </div>
      </header>
      {/* Profile Sidebar */}
      <ProfileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={currentUser}
        onEditProfile={() => {
          setSidebarOpen(false);
          if (window) window.dispatchEvent(new CustomEvent("edit-profile"));
        }}
        onLogout={onLogout}
        setActiveModal={setActiveModal}
      />
    </>
  );
}

export default Header;
