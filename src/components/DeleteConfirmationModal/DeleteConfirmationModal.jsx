
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <div className="modal modal_opened">
      <div className="modal__content modal__content_type_confirm">
        <button className="modal__close" onClick={onCancel}>
          &times;
        </button>
        <p className="modal__text">
          Are you sure you want to delete this item?
          <br />
          <span style={{ fontWeight: 400, fontSize: 16 }}>
            This action is irreversible.
          </span>
        </p>
        <button className="modal__confirm-btn" onClick={onConfirm}>
          Yes, delete item
        </button>
        <button className="modal__cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
