import "./Header.css";
import headerLogo from "../../../assets/header__Logo.svg";
import headerAvatar from "../../../assets/header__Avatar.svg";
import ToggleSwitch from "../../../ToggleSwitch/ToggleSwitch";
function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img src={headerLogo} alt="WTWR logo" className="header__logo" />

      <p className="header__date-and-location">
        {currentDate},{weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="button header__add-clothes-btn"
      >
        {" "}
        + Add clothes
      </button>
      <div className="header__user-container">
        <ToggleSwitch />
        <p className="header__username">Terrence T</p>
        <img src={headerAvatar} alt="Terrence T" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
