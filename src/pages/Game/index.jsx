import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './components/Header';
import Questions from './components/Questions';
import Loading from '../../components/Loading';

function Game({ user, questions }) {
  const isLoading = !user.name || !questions.results;
  if (isLoading) return <Loading />;

  return (
    <div>
      <Header />
      <Questions />
    </div>
  );
}

const mapStateToProps = ({ settings: { user }, game: { questions } }) => ({
  user,
  questions,
});

Game.propTypes = {
  user: PropTypes.object,
  questions: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Game);
