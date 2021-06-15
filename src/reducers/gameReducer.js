import {
  GET_QUESTIONS,
  GET_QUESTIONS_ERROR,
  GET_QUESTIONS_SUCCESS,
} from '../actions/gameActions';

const INITIAL_STATE = {
  error: null,
  isLoading: false,
  questions: {},
};

export default function gameReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case GET_QUESTIONS:
    return { ...state, isLoading: true };

  case GET_QUESTIONS_SUCCESS:
    return { ...state, isLoading: false, questions: payload };

  case GET_QUESTIONS_ERROR:
    return { ...state, isLoading: false, error: payload };

  default:
    return state;
  }
}
