import "./DeleteModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function DeleteModal({ card, onCloseClick, isOpened, onDeleteCard }) {
  const context = useContext(CurrentUserContext);

  if (!context) {
    console.warn("CurrentUserContext is null. Make sure the provider is set.");
    return null;
  }

  const { currentUser } = context;
  const isOwn = card.owner === currentUser?._id;
  const itemConfirmDeleteClassname = `modal__button modal__button_confirm ${isOwn ? "" : "modal__button_hidden"}`;

  const handleDeleteItem = () => {
    if (isOwn) {
      onDeleteCard(card._id);
    } else {
      console.warn("User does not own this card!");
    }
  };

  if (!isOpened) return null;

  return (
    <div className={`modal ${isOpened ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content-delete">
        <button
          onClick={onCloseClick}
          type="button"
          className="modal__delete-close"
          aria-label="Close delete modal"
        ></button>
        <div className="modal__delete-text-panel">
          <p className="modal__delete-text">
            Are you sure you want to delete this item?
          </p>
          <p className="modal__delete-text">This action is irreversible.</p>
        </div>
        <div className="modal__delete-button-panel">
          <button
            className="modal__delete-button modal__delete-button_yes"
            onClick={handleDeleteItem}
          >
            Yes, delete item
          </button>
          <button className="modal__delete-button" onClick={onCloseClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
