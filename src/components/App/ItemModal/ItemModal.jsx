import "./ItemModal.css";
import React from "react";
import { deleteItem } from "../../../utils/api";

function ItemModal({ isOpen, onClose, onDelete, card }) {
  if (!isOpen) return null;

  const handleDelete = () => {
    if (!card || !card._id) {
      console.error("Item is missing _id", card);
      return;
    }

    deleteItem(card);
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
          <p className="modal__caption">{card.name}</p>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button className="modal__delete-button" onClick={handleDelete}>
            Delete Card
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
