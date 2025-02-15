import React, { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Check if the current user has liked this card
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  // Handler to call when the like button is clicked
  const handleLike = () => {
    onCardLike(item._id, isLiked);
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
      <button
        className={`like-button ${isLiked ? "active" : ""}`}
        onClick={handleLike}
      >
        {isLiked ? "Unlike" : "Like"}
      </button>
    </li>
  );
}

export default ItemCard;
