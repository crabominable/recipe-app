export const fetchSearchApi = async (searchInput, radioInput, myPage) => {
  if (radioInput === 'ingredient') {
    const returnedJson = await fetch(`https://www.${myPage}.com/api/json/v1/1/filter.php?i=${searchInput}`)
      .then((res) => res.json());
    return returnedJson;
  } if (radioInput === 'name') {
    const returnedJson = await fetch(`https://www.${myPage}.com/api/json/v1/1/search.php?s=${searchInput}`)
      .then((res) => res.json());
    return returnedJson;
  }
  if (radioInput === 'first-letter' && searchInput.length > 1) {
    global.alert('Sua busca deve conter somente 1 (um) caracter');
  }
  const returnedJson = await fetch(`https://www.${myPage}.com/api/json/v1/1/search.php?f=${searchInput}`)
    .then((res) => res.json());
  return returnedJson;
};

export const fetchRandonRecipes = async (myPage) => {
  const returnedJson = await fetch(`https://www.${myPage}.com/api/json/v1/1/search.php?s=`)
    .then((res) => res.json());
  return returnedJson;
};

/* Requisição para Categorias de meals and Drinks */

export const fetchCategory = async (myPage) => {
  const result = await fetch(`https://www.${myPage}.com/api/json/v1/1/list.php?c=list`)
    .then((resp) => resp.json());
  return result;
};

export const fetchCategoryApi = async (myPage, category) => {
  const result = await fetch(`https://www.${myPage}.com/api/json/v1/1/filter.php?c=${category}`)
    .then((resp) => resp.json());
  return result;
};

export const fetchRecipesDetails = async (id, myPage) => {
  const result = await fetch(`https://www.${myPage}.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((resp) => resp.json());
  return result;
};

export const fetchRecipesRandom = async (myPage) => {
  const result = await fetch(`https://www.${myPage}.com/api/json/v1/1/random.php`)
    .then((resp) => resp.json());
  return result;
};

export const fetchAreaRecipes = async () => {
  const result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((resp) => resp.json());
  return result;
};

export const fetchRecipesByArea = async (area) => {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    .then((resp) => resp.json());
  return result;
};

export const fetchIngredients = async (myPage) => {
  const result = await fetch(`https://www.${myPage}.com/api/json/v1/1/list.php?i=list`)
    .then((resp) => resp.json());
  return result;
};

export const fetchRecipesIngredients = async (myPage, ingredient) => {
  const result = await fetch(`https://www.${myPage}.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((resp) => resp.json());
  return result;
};

// www.themealdb.com/api/json/v1/1/filter.php?a=Canadian

// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=
// www.themealdb.com/api/json/v1/1/lookup.php?i=52772
// www.thecockta.com/api/json/v1/1/lookup.php?i=11007

// www.themealdb.com/api/json/v1/1/categories.php
// www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail

// https://www.themealdb.com/api/json/v1/1/filter.php?c=All
