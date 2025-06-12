import "./ItemModal.css";
// import React from "react";

function ItemModal({ isOpen, onClose, handleDeleteItem, card }) {
  if (!isOpen) return null;

  const handleDelete = () => {
    if (!card) {
      console.error("Item is missing _id", card);
      return;
    }
    handleDeleteItem(card._id);
  };

  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={onClose} // <-- Clicking the overlay closes modal
    >
      <div
        className="modal__content modal__content_type_image"
        onClick={(e) => e.stopPropagation()} // <-- Prevents closing when clicking inside
      >
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="modal__close-icon"
            fill="none"
            stroke="#222"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle
              cx="12"
              cy="12"
              r="11"
              stroke="#aaa"
              strokeWidth="2"
              fill="#fff"
            />
            <line x1="8" y1="8" x2="16" y2="16" />
            <line x1="16" y1="8" x2="8" y2="16" />
          </svg>
        </button>

        <img src={card.imageUrl} alt="Modal Image" className="modal__image" />
        <div className="modal__footer">
          <p className="modal__footer-caption">{card.name}</p>
          <p className="modal__footer-weather">Weather: {card.weather}</p>
          <button className="modal__footer-delete" onClick={handleDelete}>
            Delete Card
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
