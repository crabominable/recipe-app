import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';

import {
  Login,
  FoodsPage,
  DrinksPage,
  FoodDetailPage,
  DrinkDetailPage,
  FoodDetailInProgressPage,
  DrinkDetailInProgressPage,
  ToExplorePage,
  ToExploreFoodsPage,
  ToExploreDrinksPage,
  ToExploreFoodsIngredientsPage,
  ToExploreDrinksIngredientsPage,
  ToExploreFoodsInArea,
  Profile,
  RecipesMade,
  FavoriteRecipes,
  NotFoundPage,
} from './pages';

// import Login from './pages/Login';
// import FoodsPage from './pages/FoodsPage';

function App() {
  return (

    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ FoodsPage } />
      <Route exact path="/bebidas" component={ DrinksPage } />
      <Route exact path="/comidas/:id" component={ FoodDetailPage } />
      <Route exact path="/bebidas/:id" component={ DrinkDetailPage } />
      <Route
        exact
        path="/comidas/:id/in-progress"
        component={ FoodDetailInProgressPage }
      />
      <Route
        exact
        path="/bebidas/:id/in-progress"
        component={ DrinkDetailInProgressPage }
      />
      <Route exact path="/explorar" component={ ToExplorePage } />
      <Route exact path="/explorar/comidas" component={ ToExploreFoodsPage } />
      <Route exact path="/explorar/bebidas" component={ ToExploreDrinksPage } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ToExploreFoodsIngredientsPage }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ToExploreDrinksIngredientsPage }
      />
      <Route exact path="/explorar/comidas/area" component={ ToExploreFoodsInArea } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ RecipesMade } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route component={ NotFoundPage } />
    </Switch>

  );
}

export default App;
