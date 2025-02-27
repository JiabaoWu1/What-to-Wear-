import "./Header.css";
import headerLogo from "../../../assets/header__Logo.svg";
import headerAvatar from "../../../assets/header__Avatar.svg";
import ToggleSwitch from "../../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/">
        {" "}
        <img src={headerLogo} alt="WTWR logo" className="header__logo" />{" "}
      </Link>

      <p className="header__date-and-location">
        {currentDate},{weatherData.city}
      </p>

      <ToggleSwitch className="header__toggle" />
      <button
        onClick={handleAddClick}
        type="button"
        className="button header__add-clothes-btn"
      >
        {" "}
        + Add clothes
      </button>
      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__username">Terrence T</p>
          <img src={headerAvatar} alt="Terrence T" className="header__avatar" />
        </div>
      </Link>
    </header>
  );
}

export default Header;
