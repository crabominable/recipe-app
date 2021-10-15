import React from 'react';
import { Link } from 'react-router-dom';
import { Footer, Header } from '../components';
import drinkExploreIcon from '../images/drinkExploreIcon.svg';
import foodExploreIcon from '../images/foodExploreIcon.svg';
import '../css/ToExplorePage.css';

function ToExplorePage() {
  return (
    <div className="container-explore-page">
      <Header title="Explorar" />
      <Link
        className="button-explore"
        to="/explorar/comidas"
      >
        <button
          data-testid="explore-food"
          type="button"
        >
          <img src={ foodExploreIcon } alt="food" />
          Explorar Comidas
        </button>
      </Link>

      <Link
        className="button-explore"
        to="/explorar/bebidas"
      >
        <button
          data-testid="explore-drinks"
          type="button"
        >
          <img src={ drinkExploreIcon } alt="drink" />
          Explorar Bebidas
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default ToExplorePage;
