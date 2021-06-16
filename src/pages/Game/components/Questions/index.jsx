import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles.css';

class Questions extends React.Component {
  constructor() {
    super();

    this.state = {
      answersVisibility: 'hidden',
      answersTimeout: false,
      timer: 30,
      answers: [],
    };

    this.timerInterval = null;
    this.awaitAnswerSelection = null;

    this.answerSelection = this.answerSelection.bind(this);
  }

  componentDidMount() {
    this.initCountdown();
    this.shuffleAnswers();
  }

  initCountdown() {
    clearInterval(this.timerInterval);
    clearTimeout(this.awaitAnswerSelection);

    const oneSecond = 1000;
    const fiveSeconds = 5000;
    this.timerInterval = setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) {
        this.setState({ timer: timer - 1 });
      } else {
        clearInterval(this.timerInterval);
        this.awaitAnswerSelection = setTimeout(() => {
          this.setState({
            answersVisibility: 'visible',
            answersTimeout: true,
          });
        }, fiveSeconds);
      }
    }, oneSecond);
  }

  shuffleAnswers() {
    const { questions } = this.props;
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
    answers = answers.sort(() => Math.random() - mathRandomMiddleNumber);

    this.setState({ answers });
  }

  answerSelection() {
    this.setState({ answersVisibility: 'visible' });
  }

  render() {
    const { questions } = this.props;
    const { answersVisibility, answersTimeout, timer, answers } = this.state;

    return (
      <div>
        <div>{timer}</div>
        <div className="question">
          <span data-testid="question-category">{ questions[0].category }</span>
          <p data-testid="question-text">{ questions[0].question }</p>
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
              disabled={ answersTimeout }
              onClick={ this.answerSelection }
            >
              { question }

            </button>
          )) }
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
