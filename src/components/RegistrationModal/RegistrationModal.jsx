import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegistrationModal = ({
  closeActiveModal,
  onRegistration,
  isRegisterOpen,
  handleLoginClick,
  registerError,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.value);

  const handleRegistration = (e) => {
    e.preventDefault();
    onRegistration({ email, password, name, avatar });
  };

  useEffect(() => {
    if (isRegisterOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setAvatar("");
    }
  }, [isRegisterOpen]);

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      isOpen={isRegisterOpen}
      onClose={closeActiveModal}
      onSubmit={handleRegistration}
      error={registerError}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
      <button
        type="button"
        className="modal__submit modal__submit-alt"
        onClick={handleLoginClick}
      >
        or Log in
      </button>
    </ModalWithForm>
  );
};

export default RegistrationModal;
