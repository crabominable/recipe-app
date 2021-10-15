import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Context';

const Provider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [checkDone, setCheckDone] = useState(false);
  const [checkFavorite, setCheckFavorite] = useState(false);
  const [checkProgress, setCheckProgress] = useState('Iniciar Receita');
  const [radioInput, setRadioInput] = useState('');
  const [myPage, setMyPage] = useState('');
  const [recipes, setRecipes] = useState([]);

  const contextValue = {
    checkDone,
    checkFavorite,
    checkProgress,
    email,
    setEmail,
    searchInput,
    password,
    setPassword,
    setSearchInput,
    radioInput,
    recipes,
    setCheckDone,
    setCheckFavorite,
    setCheckProgress,
    setRadioInput,
    setRecipes,
    setMyPage,
    myPage,
  };
  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
};

export default Provider;

Provider.propTypes = { children: PropTypes.node.isRequired };
