import React, { useState } from "react";
import ModalWithForm from "../App/ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

function AddItemModal({ closeActiveModal, onSubmit, isOpen }) {
  const [name, setName] = useState("");
  const [link, setUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleButtonChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !link || !weather) {
      alert("Please fill out all fields and select a weather type!");
      return;
    }

    setIsSubmitting(true); // Disable submit button
    onSubmit({ name, imageUrl: link, weather })
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
        setIsSubmitting(false); // Re-enable submit button
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
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            value="hot"
            name="weather"
            type="radio"
            className="modal__radio_button_input"
            onChange={handleButtonChange}
            required
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            value="warm"
            name="weather"
            type="radio"
            className="modal__radio_button_input"
            onChange={handleButtonChange}
            required
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            value="cold"
            name="weather"
            type="radio"
            className="modal__radio_button_input"
            onChange={handleButtonChange}
            required
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
