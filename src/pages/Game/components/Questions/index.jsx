import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles.css';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answersVisibility: 'hidden',
      indexQuestion: 0,
    };

    this.answerSelection = this.answerSelection.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  answerSelection() {
    this.setState({ answersVisibility: 'visible' });
  }

  nextQuestion() {
    const { indexQuestion } = this.state;
    this.setState({
      answersVisibility: 'hidden',
      indexQuestion: indexQuestion + 1,
    });
  }

  render() {
    const { questions } = this.props;
    const { answersVisibility, indexQuestion } = this.state;
    // Math.random retorna números entre 0 e 1
    const mathRandomMiddleNumber = 0.5;
    const correctAnswer = {
      question: questions[indexQuestion].correct_answer,
      dataTestid: 'correct-answer',
    };
    const incorrectAnswers = questions[indexQuestion].incorrect_answers
      .map((incorrect, index) => ({
        question: incorrect,
        dataTestid: `wrong-answer-${index}`,
      }));

    let answers = [correctAnswer, ...incorrectAnswers];
    // Shuffle nossa lista
    answers = answers.sort(() => Math.random() - mathRandomMiddleNumber);

    return (
      <div>
        <div className="question">
          <span data-testid="question-category">
            { questions[indexQuestion].category }
          </span>
          <p data-testid="question-text">{ questions[indexQuestion].question }</p>
        </div>
        <div className={ `answers ${answersVisibility}` }>
          { answers.map(({ question, dataTestid }) => (
            <button
              key={ question }
              data-testid={ dataTestid }
              type="button"
              className={
                dataTestid === 'correct-answer' ? 'answer-btn-correct' : 'answer-btn-inc'
              }
              onClick={ this.answerSelection }
            >
              { question }
            </button>
          )) }
          { answersVisibility !== 'hidden' && (
            <button type="button" data-testid="btn-next" onClick={ this.nextQuestion }>
              Próxima
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ game: { questions } }) => ({
  questions: questions.results,
});

Questions.propTypes = {
  questions: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Questions);
