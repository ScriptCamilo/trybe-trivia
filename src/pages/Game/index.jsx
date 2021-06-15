import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './components/Header';
import Questions from './components/Questions';

function Game({ user, questions }) {
  const isLoading = !user.name || !Object.keys(questions).length;

  if (isLoading) return <h1>Carregando...</h1>;

  return (
    <div>
      <Header />
      <Questions />
    </div>
  );
}

const mapStateToProps = ({ settings, game }) => ({
  user: settings.user,
  questions: game.questions,
});

Game.propTypes = {
  user: PropTypes.object,
  questions: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Game);
