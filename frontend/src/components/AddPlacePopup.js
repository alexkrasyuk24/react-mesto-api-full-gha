import React from "react";
import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isLoading }) => {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    onAddPlace({ name, link });
  };

  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"add"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      buttonDisabled={isLoading}
    >
      <input
        value={name || ""}
        id="input-mesto"
        required
        type="text"
        minLength="2"
        maxLength="30"
        className="popup__input popup__input_value_place"
        name="name"
        placeholder="Название"
        onChange={(evt) => setName(evt.target.value)}
      />
      <span id="input-mesto-error" className="error"></span>
      <input
        id="input-link"
        required
        type="url"
        className="popup__input popup__input_value_link"
        name="link"
        placeholder="Ссылка на картинку"
        onChange={(evt) => setLink(evt.target.value)}
        value={link || ""}
      />
      <span id="input-link-error" className="error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
