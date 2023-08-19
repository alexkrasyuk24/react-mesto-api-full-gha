import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/header/mesto_logo.svg";

const Header = ({ isLoggedIn, email, onLogout }) => {
  const location = useLocation(); 
  const [linkPath, setLinkPath] = React.useState("");
  const [linkText, setLinkText] = React.useState("");

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
          <p>{email}</p>
          <button className="header__button" onClick={onLogout}>Выйти</button>
        </div>
      )}
      {!isLoggedIn && <Link className="header__link" to={linkPath}>{linkText}</Link>}
      </div>
    </header>
  );
};

export default Header;
