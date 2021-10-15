import React from 'react';
import PropTypes from 'prop-types';
import backArrow from '../images/backArrow.svg';
import '../css/GoBack.css';

function Goback({ goBack }) {
  return (
    <button
      className="button-go-back"
      type="button"
      onClick={ goBack }
    >
      <img src={ backArrow } alt="go-back" />
      <p>voltar</p>
    </button>
  );
}

Goback.propTypes = {
  goBack: PropTypes.func.isRequired,
};

export default Goback;
