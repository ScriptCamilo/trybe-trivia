import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Questions({ questions }) {
  const answers = [
    ...questions[0].incorrect_answers, questions[0].correct_answer,
  ];

  return (
    <div>
      <div className="question">
        <span data-testid="question-category">{ questions[0].category }</span>
        <p data-testid="question-text">{ questions[0].question }</p>
      </div>
      <div className="answers">
        { answers.map((answer) => (
          <button key={ answer } type="button">{ answer }</button>
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
