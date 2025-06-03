import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  closeActiveModal,
  onLogin,
  isLoginOpen,
  handleRegisterClick,
  loginError,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  useEffect(() => {
    if (isLoginOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isLoginOpen]);

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
      isOpen={isLoginOpen}
      onClose={closeActiveModal}
      onSubmit={handleLogin}
      error={loginError}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          id="login__email"
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
          id="login__password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <div className="modal__submit-buttons">
        <button type="submit" className="modal__submit">Log in</button>
        <button
          type="button"
          className="modal__submit modal__submit-alt"
          onClick={handleRegisterClick}
        >
          or Register
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
