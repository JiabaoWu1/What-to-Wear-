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
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
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
