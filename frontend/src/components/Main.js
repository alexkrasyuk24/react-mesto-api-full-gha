import React, { useContext } from "react"
import Card from "./Card"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) => {
  const { name, about, avatar } = useContext(CurrentUserContext)
 
  return (
    <main className="content">
      <section className="profile">
        <img className="profile__avatar-image" src={avatar} alt="Аватарка" />
        <button
          className="profile__avatar-button"
          onClick={onEditAvatar}
        ></button>
        <div className="profile__info">
          <h1 className="profile__title">{name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Редактировать профиль"
            onClick={onEditProfile}
          ></button>
          <p className="profile__subtitle">{about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить фото"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list" aria-label="Изображения">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            )
          })}
        </ul>
      </section>
    </main>
  )
}

export default Main
