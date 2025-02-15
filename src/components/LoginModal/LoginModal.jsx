import "./LoginModal.css";
import { useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { useFormAndValidation } from "../../Hooks/UseFormAndValidation.js";

function LoginModal({
  onCloseClick,
  onLoginUser,
  isOpened,
  onRegistrationClick,
  onLoginResponseInfo,
  onIsPasswordValid,
}) {
  const initialValues = {
    email: "",
    password: "",
  };

  const { isPasswordValid } = useContext(CurrentUserContext);
  const passwordValidClass = !isPasswordValid ? "password__modal_mod" : "";

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation(initialValues);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await onLoginUser(values);
      onLoginResponseInfo();
      resetForm();
      onCloseClick();
      onIsPasswordValid(true);
    } catch (err) {
      console.error("Login failed:", err);
      onIsPasswordValid(false);
    }
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      buttonText2="Sign Up"
      onCloseClick={onCloseClick}
      onSubmit={handleSubmit}
      isSecondButtonVisible={true}
      isOpened={isOpened}
      isSubmitVisible={isValid} // Ensures button is disabled if form is invalid
      onOpenSignup={onRegistrationClick}
    >
      {/* Email Input */}
      <label htmlFor="emailLogin" className="modal__label">
        Email
        <input
          name="email"
          type="email"
          className="modal__input modal__input_email"
          id="emailLogin"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        {errors.email && (
          <p className="validation__email-message">{errors.email}</p>
        )}
      </label>

      {/* Password Input */}
      <label htmlFor="password" className="modal__label">
        <p className={`password__text ${passwordValidClass}`}>
          {isPasswordValid ? "Password" : "Incorrect password"}
        </p>
        <input
          name="password"
          type="password"
          className={`modal__input ${passwordValidClass}`}
          id="password"
          placeholder="Password"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
        {errors.password && (
          <p className="validation__password-message">{errors.password}</p>
        )}
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
