import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser?._id);
  const isOwn = item.owner === currentUser?._id;

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : "card__like-button_inactive"
  }`;

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
  src={item.imageUrl || item.image || ""}
  alt={item.name}
/>
    </li>
  );
}

export default ItemCard;
