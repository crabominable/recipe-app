import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../css/StartRecipeButton.css';

export default function StartRecipeButton({ id, onClick, title, page }) {
  return (
    <Link
      style={ { textDecoration: 'none' } }
      className="container-recipe-button"
      to={ `/${page}/${id}/in-progress` }
    >
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ onClick }
      >
        {title}
      </button>
    </Link>
  );
}

StartRecipeButton.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};
