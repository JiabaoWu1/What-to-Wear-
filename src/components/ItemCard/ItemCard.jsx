import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = Boolean(localStorage.getItem("jwt"));

  const userId = currentUser?._id;
  const isLiked = isLoggedIn && userId
    ? item.likes.some((id) => id === userId)
    : false;

  const handleLike = (e) => {
  e.stopPropagation();
  if (!isLoggedIn) return;
  onCardLike(item); // 
};
  const handleCardClick = () => onCardClick(item);

  return (
    <li className="card">
      <div className="card__info_container">
        <h2 className="card__name">{item.name}</h2>

        {/* Heart icon controlled by CSS */}
        {isLoggedIn && (
         <button
  className={`card__heart-icon ${isLiked ? "card__heart-icon_active" : ""}`}
  onClick={handleLike}
  aria-label={isLiked ? "Unlike" : "Like"}
  type="button"
>
  {isLiked ? "♥" : "♡"}
</button>

        )}
      </div>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl || item.image || ""}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
