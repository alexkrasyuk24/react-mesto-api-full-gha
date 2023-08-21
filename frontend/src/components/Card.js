import React, { useContext } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

const Card = ({
 onCardClick,
  onCardLike,
  onCardDelete,
  card,
}) => {
  const currentUser = useContext(CurrentUserContext)
 
  //const isOwn = owner._id === currentUser._id;
  const isOwn = (card.owner?._id || card.owner) === currentUser._id
  const isLiked = card.likes.some((i) => i === currentUser._id)
  const cardLikeButtonClassName = `elements__like ${
    isLiked ? "element__like-btn_active" : ""
  }`

  const handleClickCard = () => {
    onCardClick(card)
  }

  const handleLikeClick = () => {
    onCardLike(card)
  }

  const handleDeleteClick = () => {
    onCardDelete(card)
  }

  return (
    <li className="elements__item">
      <img
        src={card.link}
        alt={card.name}
        className="elements__image"
        onClick={handleClickCard}
      />
      <div className="elements__container">
        <h2 className="elements__title">{card.name}</h2>
        <div className="element__likes">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Лайк"
            onClick={handleLikeClick}
          />
          <span className="element__likes-number">{card.likes.length}</span>
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
  )
}

export default Card
