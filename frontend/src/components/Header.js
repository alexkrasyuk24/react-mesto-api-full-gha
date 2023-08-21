/*import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/header/mesto_logo.svg";

const Header = ({ isLoggedIn, email, onLogout }) => {
  const location = useLocation(); 
  const [linkPath, setLinkPath] = React.useState("");
  const [linkText, setLinkText] = React.useState("");

console.log("Email in Header:", email);
  React.useEffect(() => {
    switch(location.pathname) {
      case '/sign-in' : 
      setLinkPath('/sign-up')
      setLinkText('Регистрация')
      break
      case '/sign-up' : 
      setLinkPath('/sign-in')
      setLinkText('Войти')
      break
    }
  }, [location.pathname]);
  return (
    <header className="header">
      <div className="header__container">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      {isLoggedIn && (
        <div className="header__mail">
          {email && <p>{email}</p>}
          <button className="header__button" onClick={onLogout}>Выйти</button>
        </div>
      )}
      {!isLoggedIn && <Link className="header__link" to={linkPath}>{linkText}</Link>}
      </div>
    </header>
  );
};

export default Header;*/
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/header/mesto_logo.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext"; // Импортируйте контекст

const Header = ({ isLoggedIn, onLogout }) => {
  const { email } = useContext(CurrentUserContext); // Получите email из контекста
  const location = useLocation();
  const [linkPath, setLinkPath] = useState("");
  const [linkText, setLinkText] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case '/sign-in':
        setLinkPath('/sign-up');
        setLinkText('Регистрация');
        break;
      case '/sign-up':
        setLinkPath('/sign-in');
        setLinkText('Войти');
        break;
      default:
        setLinkPath('/');
        setLinkText('');
    }
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Логотип Место" />
        {isLoggedIn && (
          <div className="header__mail">
            {email && <p>{email}</p>}
            <button className="header__button" onClick={onLogout}>Выйти</button>
          </div>
        )}
        {!isLoggedIn && <Link className="header__link" to={linkPath}>{linkText}</Link>}
      </div>
    </header>
  );
};

export default Header;
