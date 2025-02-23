import React from 'react';
import {Route, Link, useNavigate, Routes} from 'react-router-dom';
import * as auth from "../utils/auth";
import logoPath from "../images/logo.svg";
import "../blocks/header/header.css";
import "../blocks/page/page.css";

// В корневом компоненте App описаны обработчики: onRegister, onLogin и onSignOut. Эти обработчики переданы в соответствующие компоненты: Register.js, Login.js, Header.js
function Header ({ setIsLoggedIn}) {
    //В компоненты добавлены новые стейт-переменные: email — в компонент App
    const [email, setEmail] = React.useState("");

    const navigate = useNavigate();

    // при монтировании App описан эффект, проверяющий наличие токена и его валидности
    React.useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            auth
                .checkToken(token)
                .then((res) => {
                    setEmail(res.data.email);
                    setIsLoggedIn(true);
                    navigate("/");
                })
                .catch((err) => {
                    localStorage.removeItem("jwt");
                    console.log(err);
                });
        }
    }, [navigate]);

    function onSignOut() {
        // при вызове обработчика onSignOut происходит удаление jwt
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        // После успешного вызова обработчика onSignOut происходит редирект на /signin
        navigate("/signin");
    }

  function handleSignOut(){
    onSignOut();
  }
  return (
    <header className="header page__section">
      <img src={logoPath} alt="Логотип проекта Mesto" className="logo header__logo" />
        <Routes>
            <Route exact path="/" element={
                <div className="header__wrapper">
                    <p className="header__user">{ email }</p>
                    <button className="header__logout" onClick={handleSignOut}>Выйти</button>
                </div>
            } />
            <Route path="/signup" element={<Link className="header__auth-link" to="/signin">Войти</Link>} />
            <Route path="/signin" element={<Link className="header__auth-link" to="/signup">Регистрация</Link>} />
        </Routes>
    </header>
  )
}

export default Header;
