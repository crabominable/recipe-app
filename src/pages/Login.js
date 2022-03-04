import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/Context';
import '../css/Login.css';
import LoginImage from '../images/login1.png';

const Login = () => {
  const [valideEmail, setValideEmail] = useState(false);
  const [valideLogin, setValideLogin] = useState(false);

  const { email, setEmail, password, setPassword } = useContext(MyContext);

  // https://github.com/tryber/sd-013-a-live-lectures/blob/lecture/12.2/form/src/components/LoginInput.js
  useEffect(() => {
    const regexEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

    const isValideEmail = email.match(regexEmail);
    if (isValideEmail) {
      setValideEmail(true);
    }

    const char = 6;
    if (password.length > char) {
      setValideLogin(true);
    }
  }, [email, password, setValideEmail, setValideLogin]);

  const setStorage = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const userObj = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(userObj));
  };

  const returnButton = () => {
    if (valideLogin === true && valideEmail === true) {
      return (
        <Link className="link-enable" to="/comidas">
          <button
            className="btn btn-dark real-button-enable"
            type="button"
            data-testid="login-submit-btn"
            onClick={ setStorage }
          >
            Entrar
          </button>
        </Link>
      );
    }
    return (
      <button
        className="btn btn-dark button-enable"
        type="button"
        data-testid="login-submit-btn"
        disabled
      >
        Entrar
      </button>
    );
  };

  return (
    <div className="container">
      <div className="container-form">
        <div className="title-login">
          <h1>Let me cook</h1>
          <img src={ LoginImage } alt="Cozinheiro" />
        </div>
        <form className="form-class">
          <input
            className="form-control"
            type="email"
            data-testid="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
            placeholder="Email"
          />

          <input
            className="form-control"
            type="password"
            data-testid="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
            placeholder="Senha"
          />
          { returnButton() }
        </form>
      </div>
    </div>
  );
};

export default Login;
