import { TOKEN_SUCCESS, TOKEN_RESPONSE } from '../actions/tokenAction';

const INITIAL_STATE = {
  responseTokenAPI: false,
};

const getToken = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN_SUCCESS:
    localStorage.setItem('token', JSON.stringify(action.token));
    return {
      ...state,
      token: action.token,
      responseTokenAPI: true,
      user: action.user,
    };
  case TOKEN_RESPONSE:
    return {
      ...state,
      responseTokenAPI: true,
    };
  default: return state;
  }
};

// Ref: https://pt.stackoverflow.com/questions/333611/qual-a-diferen%C3%A7a-entre-usar-tostring-e-json-stringify
export default getToken;
