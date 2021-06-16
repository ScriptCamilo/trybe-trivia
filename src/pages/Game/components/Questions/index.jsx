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
      answersTimeout: false,
      timer: 30,
      answers: [],
    };

    this.timerInterval = null;
    this.awaitAnswerSelection = null;

    this.answerSelection = this.answerSelection.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.initCountdown();
    this.shuffleAnswers();
  }

  nextQuestion() {
    const { indexQuestion } = this.state;
    this.setState({
      answersVisibility: 'hidden',
      indexQuestion: indexQuestion + 1,
    });
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
    const { indexQuestion } = this.state;
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
    answers = answers.sort(() => Math.random() - mathRandomMiddleNumber);

    this.setState({ answers });
  }

  answerSelection() {
    this.setState({ answersVisibility: 'visible' });
  }

  render() {
    const { questions } = this.props;
    const { answersVisibility, answersTimeout, timer, answers,
      indexQuestion } = this.state;

    return (
      <div>
        <div>{timer}</div>
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
              disabled={ answersTimeout }
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
