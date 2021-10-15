import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import addPhoto from '../images/addPhotoBox.svg';
import '../css/Profile.css';

function Profile() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const emailLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (emailLocalStorage) {
      setEmail(emailLocalStorage.email);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
  };

  return (
    <div className="container-profile">
      <Header title="Perfil" />
      <img src={ addPhoto } alt="add" />
      <p className="email" data-testid="profile-email">{email}</p>
      <Link
        className="profile-button-box"
        to="/receitas-feitas"
      >
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link
        className="profile-button-box"
        to="/receitas-favoritas"
      >
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link
        className="profile-button-box"
        to="/"
      >
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => logout() }
        >
          Sair
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Profile;
