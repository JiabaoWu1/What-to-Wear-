import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const isLiked = isLoggedIn && item.likes.includes(currentUser._id);

  const handleLike = (e) => {
    e.stopPropagation();
    onCardLike(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={() => onCardClick(item)}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      {isLoggedIn && (
        <button
          className={`card__like-button${isLiked ? " card__like-button_liked" : ""}`}
          onClick={handleLike}
          aria-label="Like"
        >
          ♥
        </button>
      )}
    </li>
  );
}

export default ItemCard;
