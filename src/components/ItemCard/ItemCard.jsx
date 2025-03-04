import React, { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Check if the current user has liked this card
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  // Checking if the current user is the owner of the current clothing item
  const isOwn = item.owner === currentUser?._id;

  // create a variable to set in 'ClassName' for the liked button
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : "card__like-button_inactive"
  }`;

  // Handler to call when the like button is clicked
  const handleLike = () => {
    onCardLike(item._id, isLiked);
  };

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <div className="card__info_container">
        <h2 className="card__name">{item.name}</h2>
        {isOwn && (
          <button
            onClick={handleLike}
            className={itemLikeButtonClassName}
            type="button"
          ></button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl || ""}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
