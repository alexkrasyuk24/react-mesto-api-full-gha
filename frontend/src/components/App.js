import React from "react"
import Footer from "./Footer"
import Header from "./Header"
import Main from "./Main"
import ImagePopup from "./ImagePopup"
import EditProfilePopup from "./EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import api from "../utils/api"
import AddPlacePopup from "./AddPlacePopup"
import Login from "./Login"
import Register from "./Register"
import { Route, Routes, useNavigate, Navigate } from "react-router-dom"
import apiAuth from "../utils/apiAuth"
import InfoTooltip from "./InfoTooltip"
import ProtectedRoute from "./ProtectedRoute"

const App = () => {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  const [isToolTipOpen, setisToolTipOpen] = React.useState(false)
  const [isSuccess, setisSuccess] = React.useState(false)
  const [hasToken, setHasToken] = React.useState(
    Boolean(localStorage.getItem("token"))
  )
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [userData, setUserData] = React.useState({})
  const navigate = useNavigate()

  React.useEffect(() => {
    isLoggedIn &&
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData)
          setCards(cards.data.reverse())
        })
        .catch(console.log)
  }, [isLoggedIn])

  const openEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }
  const openEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }
  const openAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setisToolTipOpen(false)
    setSelectedCard({})
  }
  const handleClickCard = ({ name, link }) => {
    setSelectedCard({ name, link })
  }

  const handleUpdateUser = (newUserInfo) => {
    setIsLoading(true)
    api
      .updateUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleUpdateAvatar = (newData) => {
    setIsLoading(true)
    api
      .editAvatar(newData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleAddPlaceSubmit = (newData) => {
    setIsLoading(true)
    api
      .addCard(newData)
      .then((newCard) => {
        setCards([newCard.data, ...cards])
        closeAllPopups()
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleCardLike(card) {
    if (!card.likes) {
      console.log("Card likes property is missing")
      return
    }

    const isLiked = card.likes.some((user) => user === currentUser._id)
    ;(isLiked ? api.unsetLike(card._id) : api.setLike(card._id, true))
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === newCard.data._id ? newCard.data : c))
        )
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id))
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }

  React.useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      console.log(token)
      apiAuth
        .checkAuth(token)
        .then((userData) => {
          console.log(userData.email)
          setUserData(userData.email)
          setIsLoggedIn(true)
          localStorage.setItem("userEmail", userData.email)
          navigate("/")
        })
        .catch(console.log)
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [hasToken])

  const handlecreateUser = (regUserData) => {
    console.log(regUserData)
    apiAuth
      .register(regUserData)
      .then(() => {
        setisSuccess(true)
        setisToolTipOpen(true)
        navigate("/sign-in")
      })
      .catch(() => {
        setisSuccess(false)
        setisToolTipOpen(true)
      })
  }

  const handleLogin = (userData) => {
    console.log(userData)
    apiAuth
      .login(userData)
      .then((res) => {
        setUserData(userData.email)
        console.log(userData.email)
        localStorage.setItem("token", res.token)
        setHasToken(true)
      })
      .catch(() => {
        setisSuccess(false)
        setisToolTipOpen(true)
      })
  }

  const handleLogout = () => {
    setHasToken(false)
    setIsLoggedIn(false)
    setUserData({})
    localStorage.removeItem("token")
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        email={userData.email}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              isLoading={isLoading}
              isLoggedIn={isLoggedIn}
              element={
                <Main
                  onAddPlace={openAddPlaceClick}
                  onEditAvatar={openEditAvatarClick}
                  onEditProfile={openEditProfileClick}
                  onCardClick={handleClickCard}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              }
            />
          }
        />
        <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/sign-up"
          element={<Register onRegister={handlecreateUser} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <InfoTooltip
        isOpen={isToolTipOpen}
        onClose={closeAllPopups}
        isSuccess={isSuccess}
      />
    </CurrentUserContext.Provider>
  )
}
export default App
