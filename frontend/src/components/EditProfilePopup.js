import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  };

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"edit"}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonDisabled={isLoading}
    >
      <input
        value={name || ""}
        onChange={(evt) => setName(evt.target.value)}
        required
        type="text"
        minLength="2"
        maxLength="40"
        className="popup__input"
        name="name"
        placeholder="Ваше имя"
      />
      <span id="input-name-error" className="error"></span>
      <input
        value={description || ""}
        onChange={(evt) => setDescription(evt.target.value)}
        required
        type="text"
        minLength="2"
        maxLength="200"
        className="popup__input"
        name="job"
        placeholder="Вид деятельности"
      />
      <span id="input-job-error" className="error"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
