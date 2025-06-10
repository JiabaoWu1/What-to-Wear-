import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  // Show like for all users (not just owners)
  const handleLike = (e) => {
    e.stopPropagation();
    onCardLike({ id: item._id, isLiked });
  };

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <div className="card__info_container">
        <h2 className="card__name">{item.name}</h2>
        <button
          className="card__like-btn"
          onClick={handleLike}
          aria-label={isLiked ? "Unlike" : "Like"}
          type="button"
        >
          {isLiked ? (
            // filled heart
            <svg width="20" height="20" viewBox="0 0 20 20" fill="#000" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 17s-7-4.35-7-9.05C3 4.27 6.13 2 10 6.13C13.87 2 17 4.27 17 7.95C17 12.65 10 17 10 17Z"/>
            </svg>
          ) : (
            // outline heart
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#000" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 17s-7-4.35-7-9.05C3 4.27 6.13 2 10 6.13C13.87 2 17 4.27 17 7.95C17 12.65 10 17 10 17Z"/>
            </svg>
          )}
        </button>
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
