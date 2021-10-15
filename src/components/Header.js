import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchField from './SearchField';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../css/Header.css';

function Header({ title, search }) {
  const [handleInput, setHandleInput] = useState(false);

  const renderButtonSearch = () => (
    <button
      id="search-button"
      type="button"
      onClick={ () => setHandleInput(!handleInput) }
    >
      <img
        id="search-icon"
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="search"
      />
    </button>
  );

  return (
    <div className="content-header">
      <div className="header-class">
        <Link to="/perfil">
          <img
            id="profile-icon"
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile"
          />
        </Link>
        <h3 data-testid="page-title">{title}</h3>
        { search ? renderButtonSearch() : <div style={ { width: '30px' } } /> }
      </div>
      { handleInput && <SearchField /> }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
