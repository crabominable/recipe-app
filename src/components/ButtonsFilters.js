import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import * as myFunc from '../services/api';
import MyContext from '../context/Context';

// IMPORT ICONS MEALS
import AllMeals from '../images/IconsFilterMeals/All.png';
import Beef from '../images/IconsFilterMeals/Beef.png';
import BreakFast from '../images/IconsFilterMeals/BreakFast.png';
import Chicken from '../images/IconsFilterMeals/Chicken.png';
import Desert from '../images/IconsFilterMeals/Desert.png';
import Goat from '../images/IconsFilterMeals/Goat.png';

// IMPORT ICONS DRINKS
import AllDrinks from '../images/IconsFilterDrinks/all.png';
import Drink from '../images/IconsFilterDrinks/drink.png';
import Cocktail from '../images/IconsFilterDrinks/cocktail.png';
import Milk from '../images/IconsFilterDrinks/milk.png';
import Other from '../images/IconsFilterDrinks/other.png';
import Cocoa from '../images/IconsFilterDrinks/cocoa.png';

import '../css/ButtonsFilters.css';

function ButtonsFilters({ page }) {
  const { myPage, setRecipes } = useContext(MyContext);
  const [filters, setFilters] = useState([]);
  const [controlFilter, setControlFilter] = useState('');
  const [arrayIconsFilter, setArrayIconsFilter] = useState([]);

  const requestCategory = async () => {
    const newFilter = ['All'];
    const LIMITER_CATEGORY = 5;
    const results = await myFunc.fetchCategory(myPage);
    results[page].forEach(
      (item, index) => index < LIMITER_CATEGORY && newFilter.push(item.strCategory),
    );
    setFilters(newFilter);
  };

  const requestCategorySelect = async (item) => {
    const LIMITER_MEALS = 12;
    if (controlFilter === item || item === 'All') {
      const result = await myFunc.fetchRandonRecipes(myPage);
      const filterCategory = result[page].filter((_item, index) => index < LIMITER_MEALS);
      setRecipes(filterCategory);
      setControlFilter('');
    } else {
      const result = await myFunc.fetchCategoryApi(myPage, item);
      const filterCategory = result[page].filter((_item, index) => index < LIMITER_MEALS);
      setRecipes(filterCategory);
      setControlFilter(item);
    }
  };

  useEffect(() => {
    if (myPage !== '') {
      requestCategory();
    }

    if (page === 'meals') {
      const imagesArray = [
        AllMeals,
        Beef,
        BreakFast,
        Chicken,
        Desert,
        Goat,
      ];
      setArrayIconsFilter(imagesArray);
    } else {
      const imagesArray = [
        AllDrinks,
        Drink,
        Cocktail,
        Milk,
        Other,
        Cocoa,
      ];
      setArrayIconsFilter(imagesArray);
    }
  }, [myPage]);

  return (
    <div className="container-buttons-filter">
      <div className="content-buttons-filter">
        <h5>Categorias</h5>
        <div className="box-buttons-filter">
          {filters.map((item, index) => (
            <button
              className="filters-button"
              type="button"
              key={ index }
              data-testid={ `${item}-category-filter` }
              onClick={ () => requestCategorySelect(item) }
            >
              <img
                className="filter-icon"
                src={ arrayIconsFilter[index] }
                alt="Filters icons"
              />
              <p>{item}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

ButtonsFilters.propTypes = {
  page: PropTypes.string.isRequired,
};

export default ButtonsFilters;
