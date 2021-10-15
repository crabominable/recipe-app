import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as myFunc from '../services/api';
import * as myFuncStorage from '../services/storage';
import * as myFuncHelper from '../services/helpers';
import { RecomendedCard, StartRecipeButton, WarningMessage, Goback } from '../components';
import '../css/FoodDetailsPage.css';

// ICONS
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FoodDetailsPage({ match, history }) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [details, setDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [quantity, setQuanitity] = useState([]);
  const [recomended, setRecomended] = useState([]);
  const [checkProgress, setCheckProgress] = useState('Iniciar Receita');
  const [checkFavorite, setCheckFavorite] = useState(false);
  const [checkDone, setCheckDone] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const { params: { id } } = match;
  const LIMITER_FOODS = 6;

  const requestDetails = async () => {
    const { meals } = await myFunc.fetchRecipesDetails(id, 'themealdb');
    setDetails(meals[0]);
    myFuncHelper.setListOfIngredientsAndQuantity(meals[0], setQuanitity, setIngredients);
  };

  const requestRecomended = async () => {
    const { drinks } = await myFunc.fetchRandonRecipes('thecocktaildb');
    setRecomended(drinks);
  };

  const returnCard = (item, index) => (
    <RecomendedCard
      category="strAlcoholic"
      testid={ `${index}-recomendation-card` }
      key={ index }
      index={ index }
      thumb="strDrinkThumb"
      name="strDrink"
      id="idDrink"
      route="bebidas"
      data={ item }
    />
  );

  const setFavorite = () => {
    myFuncStorage.setFavoriteRecipe(id, details, 'Meal');
    setCheckFavorite(myFuncStorage.checkFavoriteRecipe(id));
  };

  const returnListOfIngredients = (index, ingredient) => (
    <p
      key={ index }
      data-testid={ `${index}-ingredient-name-and-measure` }
      className="ingredient"
    >
      {`${ingredient} - ${quantity[index] !== ' ' ? quantity[index] : ''}`}
    </p>
  );

  const shareButton = () => {
    const TIME_OUT = 3000;
    myFuncHelper.copyToClipBoard(`http://localhost:3000/comidas/${id}`, setCopySuccess);
    setTimeout(() => {
      setCopySuccess('');
    }, TIME_OUT);
  };

  useEffect(() => {
    requestDetails();
    requestRecomended();
    const paramsValue = {
      doneRecipes,
      progressRecipes,
      favoriteRecipes,
      setCheckProgress,
      setCheckFavorite,
      setCheckDone,
      id,
      type: 'meals',
    };
    myFuncStorage.setAllLocalStorage(paramsValue);
  }, []);

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
        {ingredients.map((ingredient, index) => (ingredient !== undefined
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
      <h5 className="section-title">Video</h5>
      { details.strYoutube !== undefined && <iframe
        src={ `https://www.youtube.com/embed/${details.strYoutube.split('=')[1]}` }
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
        data-testid="video"
        className="video"
      /> }
      <h5 className="section-title">Recomendadas</h5>
      <div className="box-recomended">
        { recomended !== null && recomended.map((item, index) => (index >= LIMITER_FOODS
          ? null : returnCard(item, index))) }
      </div>
      { !checkDone
      && <StartRecipeButton
        id={ id }
        onClick={ () => myFuncStorage.setProgressRecipe(id, 'meals') }
        page="comidas"
        title={ checkProgress }
      /> }
      { copySuccess !== '' && <WarningMessage />}
      <Goback goBack={ history.goBack } />
    </div>
  );
}

FoodDetailsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default FoodDetailsPage;
