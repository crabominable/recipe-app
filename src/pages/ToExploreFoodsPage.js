import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer, Header } from '../components';
import ingredientIcon from '../images/ingredientIcon.svg';
import originIcon from '../images/originIcon.svg';
import surpriseIcon from '../images/surpriseIcon.svg';
import '../css/ToExploreFoodsPage.css';

import * as myFunc from '../services/api';

function ToExploreFoodsPage() {
  const [randonRecipes, setRandonRecipes] = useState('');

  const requestRecipeRandom = async () => {
    const { meals } = await myFunc.fetchRecipesRandom('themealdb');
    setRandonRecipes(meals[0]);
  };
  useEffect(() => {
    requestRecipeRandom();
  }, []);

  if (!randonRecipes) return <p>Loading...</p>;

  return (
    <div className="container-explore-page">
      <Header title="Explorar Comidas" />

      <Link
        className="button-explore"
        to="/explorar/comidas/ingredientes"
      >
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          <img src={ ingredientIcon } alt="ingredient" />
          Por Ingredientes
        </button>
      </Link>

      <Link
        className="button-explore"
        to="/explorar/comidas/area"
      >
        <button
          type="button"
          data-testid="explore-by-area"
        >
          <img src={ originIcon } alt="origin" />
          Por Local de Origem
        </button>
      </Link>

      <Link
        className="button-explore"
        to={ `/comidas/${randonRecipes.idMeal}` }
      >
        <button
          type="button"
          data-testid="explore-surprise"
        >
          <img src={ surpriseIcon } alt="surprise" />
          Me Surpreenda!
        </button>

      </Link>

      <Footer />
    </div>
  );
}

export default ToExploreFoodsPage;
