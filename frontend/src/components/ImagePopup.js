import React from "react";

const ImagePopup = ({ card, onClose }) => {
  const handleClickContainer = (event) => {
    event.stopPropagation();
  };

  const handleCloseOnEscape = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  React.useEffect(() => {
    if (card) {
      document.addEventListener("keydown", handleCloseOnEscape);
    }
    return () => document.removeEventListener("keydown", handleCloseOnEscape);
  }, [card]);

  return (
    <div
      onMouseDown={onClose}
      className={`popup image-popup ${card.link ? "popup_opened" : ""}`}
    >
      <div
        onMouseDown={handleClickContainer}
        className="image-popup__container"
      >
        <button
          className="popup__close image-popup__close"
          type="button"
          onClick={onClose}
        />
        <img src={card.link} alt={card.name} className="image-popup__image" />
        <h2 className="image-popup__title">{card.name}</h2>
      </div>
    </div>
  );
};

export default ImagePopup;
