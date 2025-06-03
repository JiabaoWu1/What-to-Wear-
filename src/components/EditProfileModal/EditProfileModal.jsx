import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ onClose, isOpen, onEdit }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser?.name || "");
    setAvatar(currentUser?.avatar || "");
  }, [currentUser]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onEdit({ name, avatar });
      onClose();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <ModalWithForm
      title="Change profile data"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="edit-name" className="modal__label">
        Name *
        <input
          id="edit-name"
          name="edit-name"
          value={name}
          type="text"
          className="modal__input"
          placeholder="Enter name"
          required
          minLength="1"
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="edit-avatar" className="modal__label">
        Avatar *
        <input
          id="edit-avatar"
          name="edit-avatar"
          value={avatar}
          type="url"
          className="modal__input"
          placeholder="Enter avatar URL"
          required
          minLength="1"
          onChange={handleAvatarChange}
        />
      </label>
      <button type="submit" className="modal__submit">
        Save changes
      </button>
    </ModalWithForm>
  );
}

export default EditProfileModal;
