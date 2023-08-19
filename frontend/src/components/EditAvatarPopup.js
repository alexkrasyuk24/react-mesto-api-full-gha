import { useRef } from "react";
import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoading }) => {
  const avatarRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = "";
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"avatar"}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="avatar"
        id="avatar"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_value_avatar"
        required
        ref={avatarRef}
      />
      <span id="avatar-error" className="error"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
