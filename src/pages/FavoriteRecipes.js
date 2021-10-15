import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/Context';
import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';
import * as myFuncStorage from '../services/storage';
import '../css/FavoriteRecipes.css';

function FavoriteRecipes() {
  const { setCheckFavorite } = useContext(MyContext);
  const favoriteRecipes = localStorage.getItem('favoriteRecipes') !== null
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
  const [recipes, setRecipes] = useState([]);
  const [foodFilter, setFoodFilter] = useState(false);
  const [drinkFilter, setDrinkFilter] = useState(false);

  const getFavoriteRecipes = () => {
    setRecipes(favoriteRecipes);
  };

  const setFavorite = (id, recipe) => {
    const newRecipes = recipes.filter((item) => item.id !== id);
    setRecipes(newRecipes);
    myFuncStorage.setFavoriteRecipe(id, recipe, 'Meal');
    setCheckFavorite(myFuncStorage.checkFavoriteRecipe(id));
  };

  const checkIsFavorite = (id) => (
    recipes.some((recipe) => recipe.id === id)
  );

  const handleFilterClick = ({ target }) => {
    if (target.id === 'All') {
      setFoodFilter(false);
      setDrinkFilter(false);
    } else if (target.id === 'Food') {
      setFoodFilter(true);
    } else if (target.id === 'Drinks') {
      setDrinkFilter(true);
    }
  };

  useEffect(() => {
    getFavoriteRecipes();
  }, []);

  return (
    <div className="container-recipes-made">
      <Header title="Receitas Favoritas" />
      <div className="filters-button-recipe-button">
        <button
          data-testid="filter-by-all-btn"
          id="All"
          onClick={ handleFilterClick }
          type="button"
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          id="Food"
          onClick={ handleFilterClick }
          type="button"
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          id="Drinks"
          onClick={ handleFilterClick }
          type="button"
        >
          Drinks
        </button>
      </div>
      <h5 className="section-title" style={ { margin: '10px' } }>Receitas</h5>
      <div className="content-favorite-recipes">
        { (recipes !== null && (foodFilter || drinkFilter)) ? recipes
          .filter((iFilter) => (foodFilter ? iFilter.type === 'comida'
            : iFilter.type === 'bebida'))
          .map((item, index) => (<FavoriteCard
            checkIsFavorite={ checkIsFavorite }
            item={ item }
            index={ index }
            key={ index }
            setFavorite={ setFavorite }
          />)) : recipes
          .map((item, index) => recipes !== null && <FavoriteCard
            checkIsFavorite={ checkIsFavorite }
            item={ item }
            index={ index }
            key={ index }
            setFavorite={ setFavorite }
          />) }
      </div>
    </div>
  );
}

export default FavoriteRecipes;
