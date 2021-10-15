import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as myFuncHelper from '../services/helpers';
import shareIcon from '../images/shareIcon.svg';
import '../css/RecipesMadeCard.css';

function RecipesMadeCard({ data, index }) {
  const { tags, name, image, doneDate, category, alcoholicOrNot, type, id, area } = data;
  const [copySuccess, setCopySuccess] = useState('');

  const returnTag = (tag) => (
    <div className="tag-box">
      <p data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
    </div>
  );

  return (
    <div className="content-made-card">
      <Link
        className="box-made-card"
        to={ `/${type}s/${id}` }
      >
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
        <div className="info-made-card">
          <p data-testid={ `${index}-horizontal-top-text` }>
            {type === 'bebida' ? alcoholicOrNot : `${area} - ${category}` }
          </p>
          <p data-testid={ `${index}-horizontal-name` }>{name}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{`Feita em: ${doneDate}`}</p>
          { type === 'comida' && <p>Tags:</p> }
          <div className="content-tags">
            { tags !== null && tags.split(',').map((item) => returnTag(item)) }
          </div>
        </div>
      </Link>
      <button
        className="share-button"
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => myFuncHelper
          .copyToClipBoard(`http://localhost:3000/${type}s/${id}`, setCopySuccess) }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt="share-icon" />
        {copySuccess}
      </button>
    </div>
  );
}

RecipesMadeCard.propTypes = {
  data: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    area: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipesMadeCard;
