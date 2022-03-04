import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import * as myFunc from '../services/api';
import drinkIngredientIcon from '../images/drinkIngredientIcon.svg';
import surpriseIcon from '../images/surpriseIcon.svg';

function ToExploreDrinksPage() {
  const [randonRecipes, setRandonRecipes] = useState('');

  const requestRecipeRandom = async () => {
    const { drinks } = await myFunc.fetchRandonRecipes('thecocktaildb');
    setRandonRecipes(drinks[0]);
  };
  useEffect(() => {
    requestRecipeRandom();
  }, []);

  if (!randonRecipes) return <p>Loading...</p>;

  return (
    <div className="container-explore-page">
      <Header title="Explorar Bebidas" />
      <Link
        style={ { textDecoration: 'none' } }
        className="button-explore"
        to="/explorar/bebidas/ingredientes"
      >
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          <img src={ drinkIngredientIcon } alt="ingredient" />
          Por Ingredientes
        </button>
      </Link>

      <Link
        style={ { textDecoration: 'none' } }
        className="button-explore"
        to={ `/bebidas/${randonRecipes.idDrink}` }
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

export default ToExploreDrinksPage;
