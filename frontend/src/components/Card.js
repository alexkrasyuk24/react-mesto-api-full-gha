import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({
  owner,
  likes,
  _id,
  name,
  link,
  onCardClick,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = owner._id === currentUser._id;
  const isLiked = likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like ${
    isLiked ? "element__like-btn_active" : ""
  }`;

  const handleClickCard = () => {
    onCardClick({ name, link });
  };

  const handleLikeClick = () => {
    onCardLike(isLiked, _id);
  };

  const handleDeleteClick = () => {
    onCardDelete(_id);
  };

  return (
    <li className="elements__item">
      <img
        src={link}
        alt={name}
        className="elements__image"
        onClick={handleClickCard}
      />
      <div className="elements__container">
        <h2 className="elements__title">{name}</h2>
        <div className="element__likes">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Лайк"
            onClick={handleLikeClick}
          />
          <span className="element__likes-number">{likes.length}</span>
        </div>
        {isOwn && (
          <button
            className="elements__delete"
            type="button"
            onClick={handleDeleteClick}
          />
        )}
      </div>
    </li>
  );
};

export default Card;
