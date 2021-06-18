import React from 'react';
import styles from '../styles.module.css';

function Authors() {
  return (
    <span className={ styles.authors }>
      Desenvolvido por:
      <a href="https://github.com/mateussays" target="_blank" rel="noreferrer">Édrei Mateus</a>
      ,
      <a href="https://github.com/nascjoao" target="_blank" rel="noreferrer">João Nasc</a>
      ,
      <a href="https://github.com/ScriptCamilo" target="_blank" rel="noreferrer">Rodrigo Camilo</a>
      e
      <a href="https://github.com/WendrickBarreto" target="_blank" rel="noreferrer">Wendrick Barreto</a>
      .
    </span>
  );
}

export default Authors;
