import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Questions({ questions }) {
  // Math.random retorna números entre 0 e 1
  const mathRandomMiddleNumber = 0.5;
  const correctAnswer = {
    question: questions[0].correct_answer,
    dataTestid: 'correct-answer',
  };
  const incorrectAnswers = questions[0].incorrect_answers.map((incorrect, index) => ({
    question: incorrect,
    dataTestid: `wrong-answer-${index}`,
  }));

  let answers = [correctAnswer, ...incorrectAnswers];
  // Shuffle nossa lista
  answers = answers.sort(() => Math.random() - mathRandomMiddleNumber);

  return (
    <div>
      <div className="question">
        <span data-testid="question-category">{ questions[0].category }</span>
        <p data-testid="question-text">{ questions[0].question }</p>
      </div>
      <div className="answers">
        { answers.map(({ question, dataTestid }) => (
          <button
            key={ question }
            data-testid={ dataTestid }
            type="button"
          >
            { question }

          </button>
        )) }
      </div>
    </div>
  );
}

const mapStateToProps = ({ game: { questions } }) => ({
  questions: questions.results,
});

Questions.propTypes = {
  questions: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Questions);
