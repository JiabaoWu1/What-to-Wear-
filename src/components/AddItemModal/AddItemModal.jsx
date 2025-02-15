import React, { useState, useContext } from "react";
import ModalWithForm from "../App/ModalWithForm/ModalWithForm";
import "./AddItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"; // Import context

function AddItemModal({ closeActiveModal, onSubmit, isOpen }) {
  const { _id: currentUserId } = useContext(CurrentUserContext); // Get current user ID
  const [name, setName] = useState("");
  const [link, setUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleButtonChange = (e) => setWeather(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !link || !weather) {
      alert("Please fill out all fields and select a weather type!");
      return;
    }

    setIsSubmitting(true);

    onSubmit({ name, imageUrl: link, weather, owner: currentUserId }) // Attach owner ID
      .then(() => {
        setName("");
        setUrl("");
        setWeather("");
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Submission error:", err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText={isSubmitting ? "Adding..." : "Add Garment"}
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitting}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image Url"
          value={link}
          onChange={handleUrlChange}
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        {["hot", "warm", "cold"].map((type) => (
          <label
            key={type}
            htmlFor={type}
            className="modal__label modal__label_type_radio"
          >
            <input
              id={type}
              value={type}
              name="weather"
              type="radio"
              className="modal__radio_button_input"
              onChange={handleButtonChange}
              required
            />{" "}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
