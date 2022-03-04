import React from 'react';
import { Link } from 'react-router-dom';
import drinks from '../images/drinkIcon.svg';
import explorar from '../images/exploreIcon.svg';
import comidas from '../images/mealIcon.svg';
import '../css/Footer.css';

function Footer() {
  return (
    <div className="content-footer" data-testid="footer">
      <div className="content-limiter">
        <Link style={ { textDecoration: 'none' } } className="footer-item" to="/comidas">
          <img data-testid="food-bottom-btn" src={ comidas } alt="comidas" />
          <p>Comidas</p>
        </Link>
        <Link style={ { textDecoration: 'none' } } className="footer-item" to="/explorar">
          <img data-testid="explore-bottom-btn" src={ explorar } alt="explorar" />
          <p>Explorar</p>
        </Link>
        <Link style={ { textDecoration: 'none' } } className="footer-item" to="/bebidas">
          <img data-testid="drinks-bottom-btn" src={ drinks } alt="drinks" />
          <p>Bebidas</p>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
