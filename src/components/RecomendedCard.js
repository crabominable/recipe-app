import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../css/RecomendedCard.css';

function RecomendedCard({ category, index, data, thumb, name, id, route, testid }) {
  return (
    <div className="container-recomended-card">
      <Link
        className="contenet-recomende-card"
        to={ `/${[route]}/${data[id]}` }
        data-testid={ testid }
      >
        <img
          data-testid={ `${index}-card-img` }
          alt={ data[category] }
          src={ data[thumb] }
        />
        <div className="box-info-recomended-card">
          <p data-testid={ `${index}-recomendation-title` }>{ data[name] }</p>
          <p>{ data[category] }</p>
        </div>
      </Link>
    </div>
  );
}

RecomendedCard.propTypes = {
  data: PropTypes.shape({
    strCategory: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default RecomendedCard;
