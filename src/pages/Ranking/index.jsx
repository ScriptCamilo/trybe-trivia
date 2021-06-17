import React, { Component } from 'react';

import CardList from './components/CardList';

// Preciso salvar no localStorage as infos do usuário e sua colocação diante os demais
// No meu cardList irei passar as infos do usuário
// Fiz uma function legal para salvar e capturar infos do localStorage como array
// Posso fazer o handle das posições ao salvar os dados ou capturar eles
class Ranking extends Component {
  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          <CardList />
        </ol>
      </>
    );
  }
}

export default Ranking;
