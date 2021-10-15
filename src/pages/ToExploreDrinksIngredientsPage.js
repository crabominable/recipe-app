import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as myFuncApi from '../services/api';
import IngredientsCard from '../components/IngredientsCard';
// import { Link } from 'react-router-dom';

function ToExploreDrinksIngredientsPage() {
  const [ingredient1, setIngredient1] = useState([]);
  const maxCard = 12;

  const requestIngredient = async () => {
    const result = await myFuncApi.fetchIngredients('thecocktaildb');
    setIngredient1(result.drinks);
  };

  useEffect(() => {
    requestIngredient();
  }, []);

  const URL = 'https://www.thecocktaildb.com/images/ingredients/';

  return (
    <div className="container-explore-foods-ingredients">
      <Header title="Explorar Ingredientes" />
      <div className="content-ingredient-list">
        {ingredient1.map((ingredient, index) => (
          index < maxCard ? (
            <IngredientsCard
              key={ index }
              index={ index }
              ingredient={ ingredient }
              page="bebidas"
              ingredientImg={ `${URL}${ingredient.strIngredient1}-Small.png` }
              ingredientName={ ` ${ingredient.strIngredient1}` }
            />) : (null)
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ToExploreDrinksIngredientsPage;
