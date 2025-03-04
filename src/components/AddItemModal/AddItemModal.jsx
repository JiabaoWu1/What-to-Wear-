import React, { useState, useContext, useCallback } from "react";
import ModalWithForm from "../App/ModalWithForm/ModalWithForm";

function AddItemModal({ closeActiveModal, onSubmit, isOpen }) {
  const { _id: currentUserId } = useContext(CurrentUserContext) || {}; // Ensure safe access
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(""); // Store form errors

  // Handle form input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(""); // Clear errors when user starts typing
  };

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const { name, imageUrl, weather } = formData;

      if (!name || !imageUrl || !weather) {
        setError("All fields are required.");
        return;
      }

      setIsSubmitting(true);

      try {
        await onSubmit({ ...formData, owner: currentUserId }); // Attach owner ID
        setFormData({ name: "", imageUrl: "", weather: "" });
        closeActiveModal();
      } catch (err) {
        console.error("Submission error:", err);
        setError("Failed to submit. Try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, currentUserId, onSubmit, closeActiveModal]
  );

  return (
    <ModalWithForm
      title="New Garment"
      buttonText={isSubmitting ? "Adding..." : "Add Garment"}
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitting}
    >
      {/* Name Input */}
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      {/* Image Input */}
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
      </label>

      {/* Weather Selection */}
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
              name="weather"
              type="radio"
              className="modal__radio_button_input"
              value={type}
              checked={formData.weather === type}
              onChange={handleChange}
              required
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </fieldset>

      {/* Error Message */}
      {error && <p className="modal__error-message">{error}</p>}
    </ModalWithForm>
  );
}

export default AddItemModal;
