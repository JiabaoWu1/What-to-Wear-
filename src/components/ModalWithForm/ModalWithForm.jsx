import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  children,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  altButtonText,
  onAltButtonClick,
  error,
  isDisabled,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close" type="button" onClick={onClose} />
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}

          {error && <span className="modal__error">{error}</span>}

          <div className="modal__button-wrapper">
            <button
              type="submit"
              className="modal__submit"
              disabled={isDisabled}
            >
              {buttonText}
            </button>
            {altButtonText && onAltButtonClick && (
              <button
                type="button"
                className="modal__alt-button"
                onClick={onAltButtonClick}
              >
                {altButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
