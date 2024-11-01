import "./Header.css";
import headerLogo from "../../../assets/header__Logo.svg";
import headerAvatar from "../../../assets/header__Avatar.svg";
function Header() {
  return (
    <header className="header">
      <img src={headerLogo} alt="TripleTen logo" className="header__logo" />

      <p className="header__date-and-location">Date,location</p>
      <button className="button header__add-clothes-btn"> + Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Terrence T</p>
        <img src={headerAvatar} alt="Terrence T" className="header__avatar" />

        <img src="" alt="" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
