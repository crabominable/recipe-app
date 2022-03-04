import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/IngredientsCard.css';

function IngredientsCard({ index, ingredient, ingredientImg, ingredientName, page }) {
  return (
    <Link
      style={ { textDecoration: 'none' } }
      className="container-ingredient-card"
      to={ { pathname: `/${page}`, query: { ingredient } } }
    >
      <div
        className="box-ingreient-card"
        data-testid={ `${index}-ingredient-card` }
      >
        <p data-testid={ `${index}-card-name` }>{ingredientName}</p>
        <img
          src={ ingredientImg }
          alt={ ingredientName }
          data-testid={ `${index}-card-img` }
        />
      </div>
    </Link>
  );
}

IngredientsCard.propTypes = {
  index: PropTypes.string,
  ingredientImg: PropTypes.string,
  ingredientName: PropTypes.string,
}.isRequired;

export default IngredientsCard;
