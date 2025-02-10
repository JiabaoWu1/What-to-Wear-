import "RegirstrationModal.css";
import { useState, useEffect } from "react";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateUrl,
} from "../../utils/validation.jsx";

import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

export default function RegistrationModal({
  onSignUpUser,
  onCloseClick,
  isOpened,
  onLoginClick,
  onLoginUser,
  onLoginResponseInfo,
  onIsPasswordValid,
}) {
  const initialValues = {
    email: "",
    password: "",
    name: "",
    avatar: "",
  };

  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitVisible, setIsSubmitVisible] = useState(false);

  const [emailVisibility, setEmailVisibility] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState("");
  const [nameVisibility, setNameVisibility] = useState("");
  const [urlVisibility, setUrlVisibility] = useState("");

  const [validationEmailMessage, setValidationEmailMessage] = useState(
    "Please enter your email"
  );
  const [validationPasswordMessage, setValidationPasswordMessage] = useState(
    "Please enter you password"
  );
  const [validationNameMessage, setValidationNameMessage] = useState(
    "Please enter in your preferred name"
  );
  const [validationUrlMessage, setValidationUrlMessage] = useState(
    "Please enter in a valid URL for your Avatar image"
  );

  const isSecondButtonVisible = true;

  const handleReset = () => {
    setValues(initialValues);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    setErrorMessage("");

    const checkValidEmail = validateEmail(values.email);
    const checkValidPassword = validatePassword(values.password);
    const checkValidName = validateName(values.name);
    const checkValidUrl = validateUrl(values.avatar);

    if (values.email !== initialValues.email) {
      setEmailVisibility(checkValidEmail.isValid ? "isHidden" : "");
      setValidationEmailMessage(checkValidEmail.message);
    }

    if (values.password !== initialValues.password) {
      setPasswordVisibility(checkValidPassword.isValid ? "isHidden" : "");
      setValidationPasswordMessage(checkValidPassword.message);
    }

    if (values.name !== initialValues.name) {
      setNameVisibility(checkValidName.isValid ? "isHidden" : "");
      setValidationNameMessage(checkValidName.message);
    }

    if (values.avatar !== initialValues.avatar) {
      setUrlVisibility(checkValidUrl.isValid ? "isHidden" : "");
      setValidationUrlMessage(checkValidUrl.message);
    }

    setEmailVisibility(checkValidEmail.isValid ? "isHidden" : "");
    setPasswordVisibility(checkValidPassword.isValid ? "isHidden" : "");
    setNameVisibility(checkValidName.isValid ? "isHidden" : "");
    setUrlVisibility(checkValidUrl.isValid ? "isHidden" : "");

    setValidationEmailMessage(checkValidEmail.message);
    setValidationPasswordMessage(checkValidPassword.message);
    setValidationNameMessage(checkValidName.message);
    setValidationUrlMessage(checkValidUrl.message);

    if (
      checkValidEmail.isValid &&
      checkValidPassword.isValid &&
      checkValidName.isValid
    ) {
      setIsSubmitVisible(true);
    }
  }, [values]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSignUpUser(values)
      .then(() => {
        const userEmail = values.email;
        const userPassword = values.password;

        onLoginUser({ email: userEmail, password: userPassword })
          .then(() => {
            onLoginResponseInfo();
            handleReset();
            onCloseClick();
            onIsPasswordValid(true);
          })
          .catch((error) => {
            setErrorMessage("Login failed", error);
            onIsPasswordValid(false);
          });
      })
      .catch((error) => console.error("Registration failed", error));
  };

  const handleOpenSignin = () => {
    onLoginClick();
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isSecondButtonVisible={isSecondButtonVisible}
      buttonText2="Log In"
      onCloseClick={onCloseClick}
      isSubmitVisible={isSubmitVisible}
      onSubmit={handleSubmit}
      isOpened={isOpened}
      onOpenSignup={handleOpenSignin}
    >
      <label htmlFor="emailRegistration" className="modal__label">
        Email*
        <input
          name="email"
          type="email"
          className="modal__input modal__input_email"
          id="emailRegistration"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        <p className={`validation__email-message ${emailVisibility}`}>
          {validationEmailMessage}
        </p>
      </label>
      <label htmlFor="passwordRegistration" className="modal__label">
        Password*
        <input
          name="password"
          type="password"
          className="modal__input modal__input_image"
          id="passwordRegistration"
          placeholder="Password"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
        <p className={`validation__password-message ${passwordVisibility}`}>
          {validationPasswordMessage}
        </p>
      </label>
      <label htmlFor="nameRegistration" className="modal__label">
        Name*
        <input
          name="name"
          type="text"
          className="modal__input modal__input_name"
          id="nameRegistration"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
        <p className={`validation__name-message ${nameVisibility}`}>
          {validationNameMessage}
        </p>
      </label>
      <label htmlFor="imageUrlRegistration" className="modal__label">
        Avatar URL*
        <input
          name="avatar"
          type="URL"
          className="modal__input modal__input_image"
          id="imageUrlRegistration"
          placeholder="Avatar URL"
          value={values.avatar || ""}
          onChange={handleChange}
        />
        <p className={`validation__url-message ${urlVisibility}`}>
          {validationUrlMessage}
        </p>
      </label>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </ModalWithForm>
  );
}
