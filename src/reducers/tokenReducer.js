import { TOKEN_SUCCESS, TOKEN_RESPONSE, TOKEN_ERROR } from '../actions/tokenAction';

const INITIAL_STATE = {
  user: {},
  isLoading: false,
  token: null,
  error: null,
};

const getToken = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN_SUCCESS:
    return {
      ...state,
      token: action.token,
      isLoading: false,
      user: action.user,
    };

  case TOKEN_ERROR:
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };

  case TOKEN_RESPONSE:
    return {
      ...state,
      isLoading: true,
    };

  default: return state;
  }
};

// Ref: https://pt.stackoverflow.com/questions/333611/qual-a-diferen%C3%A7a-entre-usar-tostring-e-json-stringify
export default getToken;
