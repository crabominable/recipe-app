import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MyContext from '../context/Context';
import * as myFunc from '../services/api';
import * as myFuncHelper from '../services/helpers';
import * as myFuncStorage from '../services/storage';
import { WarningMessage, Goback } from '../components';
import '../css/FoodDetailInProgressPage.css';

// ICONES
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FoodDetailInProgressPage({ match, history }) {
  const { checkDone,
    checkFavorite,
    checkProgress,
    setCheckDone,
    setCheckFavorite,
    setCheckProgress,
  } = useContext(MyContext);
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [details, setDetails] = useState({});
  const [quantity, setQuanitity] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [copySuccess, setCopySuccess] = useState('');
  const [checkIngredients, setCheckIngredients] = useState('');
  const [checkAllcheckbox, setCheckAllCheckbox] = useState(true);
  const { params: { id } } = match;

  const getIdRecipe = async () => {
    const { meals } = await myFunc.fetchRecipesDetails(id, 'themealdb');
    setDetails(meals[0]);
    myFuncHelper.setListOfIngredientsAndQuantity(meals[0], setQuanitity, setIngredients);
  };

  const setFavorite = () => {
    myFuncStorage.setFavoriteRecipe(id, details, 'Meal');
    setCheckFavorite(myFuncStorage.checkFavoriteRecipe(id));
  };

  const shareButton = () => {
    const TIME_OUT = 3000;
    myFuncHelper.copyToClipBoard(`http://localhost:3000/comidas/${id}`, setCopySuccess);
    setTimeout(() => {
      setCopySuccess('');
    }, TIME_OUT);
  };

  useEffect(() => {
    getIdRecipe();
    const paramsValue = {
      doneRecipes,
      progressRecipes,
      favoriteRecipes,
      setCheckProgress,
      setCheckFavorite,
      setCheckDone,
      id,
      type: 'meals',
      checkDone,
      checkProgress,
    };
    myFuncStorage.setAllLocalStorage(paramsValue);

    if (checkIngredients !== '') {
      setCheckAllCheckbox(!ingredients
        .every((ingredient) => document.getElementById(ingredient).checked));
    }
  }, [checkIngredients, setCheckAllCheckbox]);

  const returnListOfIngredients = (index, ingredient) => (
    <div data-testid={ `${index}-ingredient-step` }>
      <input
        id={ ingredient }
        type="checkbox"
        onClick={ () => myFuncHelper
          .handleIngredient(ingredient, id, 'meals', setCheckIngredients) }
        checked={ progressRecipes.meals[id].some((item) => item === ingredient) }
      />
      <label
        className="label-check-box-ingredient"
        htmlFor={ ingredient }
        key={ index }
      >
        { `${ingredient} - ${quantity[index] !== ' ' ? quantity[index] : ''}` }
      </label>
    </div>
  );

  if (details === {}) return <p>Loading...</p>;

  return (
    <div className="container-food-details">
      <img
        className="image-food-details"
        src={ details.strMealThumb }
        data-testid="recipe-photo"
        alt={ details.strMeal }
      />

      <div className="info-food-details">
        <h3
          className="title-recipe-food-details"
          data-testid="recipe-title"
        >
          {details.strMeal}
        </h3>
        <p
          className="category-recipe-food-details"
          data-testid="recipe-category"
        >
          {details.strCategory}
        </p>
      </div>

      <div className="interaction-food-details">
        <button
          className="share-icon-food-details"
          type="button"
          data-testid="share-btn"
          onClick={ () => shareButton() }
        >
          <img src={ shareIcon } alt="share-icon" />
        </button>
        <button
          className="fav-icon-food-details"
          type="button"
          data-testid="favorite-btn"
          onClick={ () => setFavorite() }
          src={ checkFavorite ? blackHeartIcon : whiteHeartIcon }
        >
          <img
            src={ checkFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="favorite-icon"
          />
        </button>
      </div>

      <h5 className="section-title">Ingredientes</h5>
      <div className="box-ingredientes">
        {ingredients.map((ingredient, index) => (
          (ingredient !== undefined && ingredient !== null)
          && returnListOfIngredients(index, ingredient)))}
      </div>

      <h5 className="section-title">Instrução</h5>
      <div className="box-instructions">
        <p
          className="instructions"
          data-testid="instructions"
        >
          {details.strInstructions}
        </p>
      </div>

      <Link
        className="box-button-done"
        to="/receitas-feitas"
      >
        <button
          className="button-done-recipe"
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ checkAllcheckbox }
          onClick={ () => myFuncStorage.setDoneRecipe(details, 'Meal') }
        >
          Finalizar Receita
        </button>
      </Link>
      { copySuccess !== '' && <WarningMessage />}
      <Goback goBack={ history.goBack } />
    </div>
  );
}

FoodDetailInProgressPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default FoodDetailInProgressPage;
