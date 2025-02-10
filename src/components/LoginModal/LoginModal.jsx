import "./LoginModal.css";

import { useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { useFormAndValidation } from "../../Hooks/UseFormAndValidation.js";

export default function LoginModal({
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

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onLoginUser(values)
      .then(() => {
        onLoginResponseInfo();
        resetForm();
        onCloseClick();
        onIsPasswordValid(true);
      })
      .catch(() => {
        onIsPasswordValid(false);
      });
  };
  const handleOpenSignup = () => {
    onRegistrationClick();
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
      isSubmitVisible={isValid}
      onOpenSignup={handleOpenSignup}
    >
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
        <p className={`validation__email-message`}>{errors?.email}</p>
      </label>

      <label htmlFor="password" className={`modal__label `}>
        {isPasswordValid ? (
          <p className="password__text">Password</p>
        ) : (
          <p className={`password__text ${passwordValidClass}`}>
            Incorrect password
          </p>
        )}
        <input
          name="password"
          type="password"
          className={`modal__input 
          ${passwordValidClass}`}
          id="password"
          placeholder="Password"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
        <p className={`validation__password-message`}>{errors?.password}</p>
      </label>
    </ModalWithForm>
  );
}
