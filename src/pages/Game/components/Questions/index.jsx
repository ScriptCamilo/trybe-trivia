import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router';
import { decode } from 'he';
import styles from './styles.module.css';
import { addScore } from '../../../../actions/gameActions';
import { upLocalStorageScore } from '../../../../utils/localStorage';
import Answers from './components/Answers';

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
    this.lastQuestion = 4;

    this.correctAnswer = 'correct-answer';

    this.answerSelection = this.answerSelection.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.initCountdown();
    this.shuffleAnswers();

    const { user: { name, email } } = this.props;
    localStorage.setItem('state', JSON.stringify({ player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: `https://www.gravatar.com/avatar/${String(md5(email))}`,
    } }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { indexQuestion } = this.state;
    if (prevState.indexQuestion !== indexQuestion && indexQuestion <= this.lastQuestion) {
      this.initCountdown();
      this.shuffleAnswers();
    }
  }

  nextQuestion() {
    const { indexQuestion } = this.state;
    this.setState({
      answersVisibility: 'hidden',
      indexQuestion: indexQuestion <= this.lastQuestion && indexQuestion + 1,
      timer: 30,
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
      difficulty: questions[indexQuestion].difficulty,
      dataTestid: this.correctAnswer,
    };
    const incorrectAnswers = questions[indexQuestion].incorrect_answers
      .map((incorrect, index) => ({
        question: incorrect,
        difficulty: questions[indexQuestion].difficulty,
        dataTestid: `wrong-answer-${index}`,
      }));

    let answers = [correctAnswer, ...incorrectAnswers];
    answers = answers.sort(() => Math.random() - mathRandomMiddleNumber);

    this.setState({ answers });
  }

  answerSelection(answerValue, difficulty) {
    this.setState({ answersVisibility: 'visible' });

    if (answerValue === this.correctAnswer) {
      const { upScore } = this.props;
      const { timer } = this.state;
      const basePoints = 10;
      const difficultyPoints = {
        easy: 1,
        medium: 2,
        hard: 3,
      };
      const score = basePoints + (timer * difficultyPoints[difficulty]);
      upScore(score);
      upLocalStorageScore(score);
    }

    clearInterval(this.timerInterval);
  }

  render() {
    const { questions } = this.props;
    const { answersVisibility, answersTimeout,
      answers, indexQuestion } = this.state;
    const numberOfQuestions = 4;
    if (indexQuestion > numberOfQuestions) {
      return <Redirect to="/feedback" />;
    }
    return (
      <div className={ styles.questionPage }>
        <div className={ styles.question }>
          <span data-testid="question-category">
            { questions[indexQuestion].category }
          </span>
          <p data-testid="question-text">
            { decode(questions[indexQuestion].question) }
          </p>
        </div>
        <Answers
          answersVisibility={ answersVisibility }
          answersTimeout={ answersTimeout }
          answers={ answers }
          nextQuestion={ this.nextQuestion }
          answerSelection={ this.answerSelection }
        />
      </div>
    );
  }
}

const mapStateToProps = ({ settings: { user }, game: { questions } }) => ({
  user,
  questions: questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  upScore: (score) => dispatch(addScore(score)),
});

Questions.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  questions: PropTypes.object,
  upScore: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
