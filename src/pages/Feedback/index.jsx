import React from 'react';
import Header from '../Game/components/Header';
import { Link } from 'react-router-dom';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
  }

  feedbackInfos() {
    const minimunAssertions = 3;
    return (
      <section>
        <p data-testid="feedback-text">
          {0 < minimunAssertions ? 'Podia ser melhor...' : 'Mandou bem!'}
        </p>
        <p data-testid="feedback-total-score">
          { `Pontuação Final: 0` }
        </p>
        <p data-testid="feedback-total-question">
          { `Número de acertos: 0` }
        </p>
      </section>
    )
  }

  render() {
    return (
      <section>
        <Header />
        {this.feedbackInfos()}
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar Novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </section>
    );
  }
}

export default Feedback;
