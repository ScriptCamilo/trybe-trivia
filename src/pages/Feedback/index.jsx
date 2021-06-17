import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Game/components/Header';

class Feedback extends React.Component {
  feedbackInfos() {
    const minimunAssertions = 3;
    const state = JSON.parse(localStorage.getItem('state'));
    const { player: { score, assertions } } = state;
    return (
      <section>
        <p data-testid="feedback-text">
          {assertions < minimunAssertions ? 'Podia ser melhor...' : 'Mandou bem!'}
        </p>
        <p>
          Pontuação Final:
          <span data-testid="feedback-total-score">
            { score }
          </span>
        </p>
        <p>
          Número de acertos:
          <span data-testid="feedback-total-question">
            { assertions }
          </span>
        </p>
      </section>
    );
  }

  buttonPlayAgain() {
    return (
      <Link to="/">
        <button
          type="button"
          data-testid="btn-play-again"
        >
          Jogar Novamente
        </button>
      </Link>
    );
  }

  buttonRanking() {
    return (
      <Link to="/ranking">
        <button
          type="button"
          data-testid="btn-ranking"
        >
          Ver Ranking
        </button>
      </Link>
    );
  }

  render() {
    return (
      <section>
        <Header />
        {this.feedbackInfos()}
        {this.buttonPlayAgain()}
        {this.buttonRanking()}
      </section>
    );
  }
}

export default Feedback;
