import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import favIcon from '../images/emptyFavIcon.svg';
import '../css/FoodCard.css';

function FoodCard({ category, index, data, thumb, name, id, route }) {
  return (
    <Link
      style={ { textDecoration: 'none' } }
      className="container-food-card"
      to={ `/${[route]}/${data[id]}` }
    >
      <div
        className="card-content"
        data-testid={ `${index}-recipe-card` }
      >
        <img
          className="card-image"
          data-testid={ `${index}-card-img` }
          alt={ data.strCategory }
          src={ data[thumb] }
        />
        <div className="content-recipe">
          <p className="type-recipe">{ data[category]}</p>
          <p className="title-recipe" data-testid={ `${index}-card-name` }>
            { data[name] }
          </p>
        </div>
        <button type="button" className="button-fav-icon">
          <img className="fav-icon" src={ favIcon } alt="fav-icon" />
        </button>
      </div>
    </Link>
  );
}

FoodCard.propTypes = {
  category: PropTypes.string.isRequired,
  data: PropTypes.shape({
    strCategory: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

export default FoodCard;
