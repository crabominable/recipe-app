import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as myFuncApi from '../services/api';
import IngredientsCard from '../components/IngredientsCard';
import '../css/ToExploreFoodsIngredientsPage.css';

function ToExploreFoodsIngredientsPage() {
  const URL = 'https://www.themealdb.com/images/ingredients/';
  const [ingredient1, setIngredient1] = useState([]);
  const MAX_CARD = 24;

  const requestIngredient = async () => {
    const result = await myFuncApi.fetchIngredients('themealdb');
    setIngredient1(result.meals);
  };

  useEffect(() => {
    requestIngredient();
  }, []);

  if (!ingredient1) return <p>Loading...</p>;

  return (
    <div className="container-explore-foods-ingredients">
      <Header title="Explorar Ingredientes" />
      <div className="content-ingredient-list">
        {ingredient1.map((ingredient, index) => (
          index < MAX_CARD && (
            <IngredientsCard
              key={ index }
              index={ index }
              page="comidas"
              ingredient={ ingredient }
              ingredientImg={ `${URL}${ingredient.strIngredient}-Small.png` }
              ingredientName={ ` ${ingredient.strIngredient}` }
            />)
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ToExploreFoodsIngredientsPage;
