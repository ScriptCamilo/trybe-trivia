import React from 'react';
import { func } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getRanking } from '../../utils/localStorage';

import CardList from './components/CardList';

function Ranking({ dispatchReset }) {
  const ranking = getRanking();

  return (
    <>
      <h1 data-testid="ranking-title">Ranking</h1>
      <ol>
        {
          ranking.map((player, index) => (
            <CardList key={ index } { ...player } position={ index + 1 } />
          ))
        }
      </ol>
      <Link data-testid="btn-go-home" onClick={ dispatchReset } to="/">
        Jogar Novamente
      </Link>
    </>
  );
}

Ranking.propTypes = {
  dispatchReset: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchReset: () => dispatch({ type: 'RESET_GAME' }),
});

export default connect(null, mapDispatchToProps)(Ranking);
