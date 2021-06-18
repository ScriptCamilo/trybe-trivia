import React from 'react';
import PropTypes from 'prop-types';
import { decode } from 'he';
import styles from '../styles.module.css';

function Answers({ answersVisibility, answersTimeout,
  answers, answerSelection, nextQuestion }) {
  return (
    <div className={ `${styles.answers} ${answersVisibility}` }>
      { answers.map(({ question, difficulty, dataTestid }) => (
        <button
          key={ question }
          data-testid={ dataTestid }
          type="button"
          className={ `${styles.answer}
            ${dataTestid === 'correct-answer' ? 'answer-btn-cor' : 'answer-btn-inc'}
          ` }
          disabled={ answersTimeout }
          onClick={ () => answerSelection(dataTestid, difficulty) }
        >
          { decode(question) }

        </button>
      )) }
      { answersVisibility !== 'hidden' && (
        <button
          type="button"
          data-testid="btn-next"
          onClick={ nextQuestion }
          className={ `btn-primary ${styles.nextQuestion}` }
        >
          Próxima
        </button>
      )}
    </div>
  );
}

Answers.propTypes = {
  answersVisibility: PropTypes.string.isRequired,
  answersTimeout: PropTypes.bool.isRequired,
  answers: PropTypes.arrayOf(PropTypes.object).isRequired,
  answerSelection: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
};

export default Answers;
