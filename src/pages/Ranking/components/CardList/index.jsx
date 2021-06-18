import React from 'react';
import { string, number } from 'prop-types';

import styles from './styles.module.css';

function CardList({ name, score, picture, position }) {
  const index = position - 1;

  return (
    <li className={ styles.container }>
      <span>
        { position }
        °
      </span>
      <figure>
        <img src={ picture } alt={ name } />
      </figure>

      <section className={ styles.score }>
        <p data-testid={ `player-name-${index}` }>{name}</p>
        <hr />
        <p>
          Pontuação:
          <span data-testid={ `player-score-${index}` }>{score}</span>
        </p>
      </section>
    </li>
  );
}

CardList.propTypes = {
  name: string.isRequired,
  score: number.isRequired,
  picture: string.isRequired,
  position: number.isRequired,
};

export default CardList;
