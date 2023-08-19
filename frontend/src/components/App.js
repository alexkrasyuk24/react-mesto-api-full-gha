import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import apiAuth from "../utils/apiAuth";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [isToolTipOpen, setisToolTipOpen] = React.useState(false);
  const [isSuccess, setisSuccess] = React.useState(false);
  const [hasToken, setHasToken] = React.useState(
    Boolean(localStorage.getItem("JWT"))
  );
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch(console.log);
  }, []);

  const openEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const openEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const openAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setisToolTipOpen(false);
    setSelectedCard({});
  };
  const handleClickCard = ({ name, link }) => {
    setSelectedCard({ name, link });
  };

  const handleUpdateUser = (newUserInfo) => {
    setIsLoading(true);
    api
      .updateUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (newData) => {
    setIsLoading(true);
    api
      .editAvatar(newData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = (newData) => {
    setIsLoading(true);
    api
      .addCard(newData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleCardLike(isLiked, id) {
    if (isLiked) {
      api
        .unsetLike(id)
        .then((res) => {
          updateCards(res);
        })
        .catch(console.log);
    } else {
      api
        .setLike(id)
        .then((res) => {
          updateCards(res);
        })
        .catch(console.log);
    }

    function updateCards(newCard) {
      setCards(
        cards.map((card) => {
          return card._id === newCard._id ? newCard : card;
        })
      );
    }
  }

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch(console.log);
  }

  React.useEffect(() => {
    if (hasToken) {
      apiAuth
        .checkAuth()
        .then(({ data }) => {
          setUserData(data);
          setIsLoggedIn(true);
          navigate("/");
        })
        .catch(console.log)
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false)
    }
  }, [hasToken]);

  const handleLogin = ({ email, password }) => {
    apiAuth
      .login({ email, password })
      .then(({ token }) => {
        localStorage.setItem("JWT", token);
        setHasToken(true);
      })
      .catch(() => {
        setisSuccess(false);
        setisToolTipOpen(true);
      });
  };

  const handleRegistration = ({ email, password }) => {
    apiAuth
      .register({ email, password })
      .then(() => {
        setisSuccess(true);
        setisToolTipOpen(true);
        navigate("/sign-in");
      })
      .catch(() => {
        setisSuccess(false);
        setisToolTipOpen(true);
      });
  };

  const handleLogout = () => {
    setHasToken(false);
    setIsLoggedIn(false);
    setUserData({});
    localStorage.removeItem("JWT");
  };

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
          element={<Register onRegister={handleRegistration} />}
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
  );
};
export default App;
