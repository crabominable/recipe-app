import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as myFuncHelper from '../services/helpers';
import '../css/FavoriteCard.css';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteCard({ checkIsFavorite, item, index, setFavorite }) {
  const [copySuccess, setCopySuccess] = useState('');
  if (!item) {
    return (<h1>Loading</h1>);
  }
  if (item.type === 'comida') {
    return (
      <div
        className="container-favorite-card"
        key={ index }
      >
        <Link className="content-favorite-card" to={ `/comidas/${item.id}` }>
          <img
            alt={ item.name }
            data-testid={ `${index}-horizontal-image` }
            src={ item.image }
          />
        </Link>
        <div className="info-favorite-recipes">
          <div className="box-info-favorite-recipes">
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${item.area} - ${item.category}`}
            </p>
            <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
          </div>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ () => myFuncHelper
              .copyToClipBoard(`http://localhost:3000/comidas/${item.id}`, setCopySuccess) }
          >
            <img src={ shareIcon } alt="share-icon" />
            {copySuccess}
          </button>
        </div>
        <div style={ { position: 'relative', right: '10px', top: '-5px' } }>
          <button
            className="button-fav-icon"
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => setFavorite(item.id, item) }
            src={ checkIsFavorite(item.id) ? blackHeartIcon : whiteHeartIcon }
          >
            <img
              src={ checkIsFavorite(item.id) ? blackHeartIcon : whiteHeartIcon }
              alt="favorite-icon"
            />
          </button>
        </div>
      </div>
    );
  }
  return (
    <div
      className="container-favorite-card"
      key={ index }
    >
      <Link className="content-favorite-card" to={ `/bebidas/${item.id}` }>
        <img
          alt={ item.name }
          data-testid={ `${index}-horizontal-image` }
          src={ item.image }
        />
      </Link>
      <div className="info-favorite-recipes">
        <div className="box-info-favorite-recipes">
          <p data-testid={ `${index}-horizontal-top-text` }>{item.alcoholicOrNot}</p>
          <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
        </div>
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          onClick={ () => myFuncHelper
            .copyToClipBoard(`http://localhost:3000/comidas/${item.id}`, setCopySuccess) }
        >
          <img src={ shareIcon } alt="share-icon" />
          {copySuccess}
        </button>
      </div>
      <div className="">
        <button
          type="button"
          data-testid={ `${index}-horizontal-favorite-btn` }
          onClick={ () => setFavorite(item.id, item) }
          src={ checkIsFavorite(item.id) ? blackHeartIcon : whiteHeartIcon }
        >
          <img
            src={ checkIsFavorite(item.id) ? blackHeartIcon : whiteHeartIcon }
            alt="favorite-icon"
          />
        </button>
      </div>
    </div>
  );
}

FavoriteCard.propTypes = {
  checkIsFavorite: PropTypes.func.isRequired,
  item: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  setFavorite: PropTypes.func.isRequired,
};

export default FavoriteCard;
