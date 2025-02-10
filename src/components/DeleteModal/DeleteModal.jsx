import "./DeleteModal.css";

function DeleteModal({ onCloseClick, isOpened, onDeleteCard }) {
  return (
    <div className={`modal ${isOpened}`}>
      <div className="modal__content modal__content-delete">
        <button
          onClick={onCloseClick}
          type="button"
          className="modal__delete-close"
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
            onClick={onDeleteCard}
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
