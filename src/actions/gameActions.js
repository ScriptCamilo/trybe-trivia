import { fetchQuestions } from '../services/api';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_ERROR = 'GET_QUESTIONS_ERROR';
export const RESET_GAME = 'RESET_GAME';
export const ADD_SCORE = 'ADD_SCORE';

export function getQuestions() {
  return {
    type: GET_QUESTIONS,
  };
}

export function getQuestionsSuccess(questions) {
  return {
    type: GET_QUESTIONS_SUCCESS,
    payload: questions,
  };
}

export function getQuestionsError(error) {
  return {
    type: GET_QUESTIONS_ERROR,
    payload: error,
  };
}

export const getQuestionsThunk = () => async (dispatch) => {
  dispatch(getQuestions());
  try {
    const questions = await fetchQuestions();
    dispatch(getQuestionsSuccess(questions));
  } catch (error) {
    dispatch(getQuestionsError(error));
  }
};

export function addScore(score) {
  return {
    type: ADD_SCORE,
    payload: score,
  };
}
