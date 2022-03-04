import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import MyContext from '../context/Context';
import * as myFunc from '../services/api';
import '../css/SearchField.css';

function SearchField() {
  const [redirect, setRedirect] = useState(false);
  const [page, setPage] = useState('');
  const [idType, setIdType] = useState();
  const {
    searchInput,
    setSearchInput,
    setRadioInput,
    setRecipes,
    recipes,
    radioInput,
    myPage,
  } = useContext(MyContext);
  async function handleFetchClick() {
    if (myPage === 'themealdb') {
      const { meals } = await myFunc.fetchSearchApi(searchInput, radioInput, myPage);
      setPage('comidas');
      setRecipes(meals);
      if (!meals) {
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else {
        setIdType('idMeal');
        return meals.length === 1 ? setRedirect(true) : setRedirect(false);
      }
    } else {
      const { drinks } = await myFunc.fetchSearchApi(searchInput, radioInput, myPage);
      setPage('bebidas');
      setRecipes(drinks);
      if (!drinks) {
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else {
        setIdType('idDrink');
        return drinks.length === 1 ? setRedirect(true) : setRedirect(false);
      }
    }
  }

  return (
    <div
      className="search-field-content"
    >
      <input
        className="form-control search-field-class"
        type="text"
        data-testid="search-input"
        placeholder="Buscar no aplicativo"
        onChange={ ({ target }) => setSearchInput(target.value) }
      />
      <div className="search-input-filters">
        <label htmlFor="ingredient">
          <input
            className="filter-input"
            id="ingredient"
            type="radio"
            name="search"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ ({ target }) => setRadioInput(target.value) }
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            className="filter-input"
            id="name"
            type="radio"
            name="search"
            data-testid="name-search-radio"
            value="name"
            onChange={ ({ target }) => setRadioInput(target.value) }
          />
          Nome
        </label>
        <label htmlFor="first-letter">
          <input
            className="filter-input"
            id="first-letter"
            type="radio"
            name="search"
            data-testid="first-letter-search-radio"
            value="first-letter"
            onChange={ ({ target }) => setRadioInput(target.value) }
          />
          Primeira letra
        </label>
      </div>
      <button
        id="search-button-filter"
        data-testid="exec-search-btn"
        onClick={ handleFetchClick }
        type="button"
      >
        Buscar
      </button>
      { redirect && <Redirect to={ `/${page}/${recipes[0][idType]}` } /> }
    </div>
  );
}

export default SearchField;
