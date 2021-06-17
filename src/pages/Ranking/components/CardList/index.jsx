import React from 'react';

import styles from './styles.module.css';

function CardList() {
  return (
    <li className={ styles.container }>
      <span>1°</span>
      <figure className={ styles.image }>
        <img src="" alt="teste" />
      </figure>

      <section className={ styles.score }>
        <span>Nome</span>
        <hr />
        <span>Pontuação: 10</span>
      </section>
    </li>
  );
}

export default CardList;
