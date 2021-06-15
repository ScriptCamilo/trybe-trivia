import { fetchToken } from '../services/api';

export const TOKEN_RESPONSE = 'TOKEN_RESPONSE';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_ERROR = 'TOKEN_ERROR';

export const tokenResponse = () => ({
  type: TOKEN_RESPONSE,
});

export const startGameSuccess = (token, user) => ({
  type: TOKEN_SUCCESS,
  token,
  user,
});

export const startGameError = (error) => ({
  type: TOKEN_ERROR,
  payload: error,
});

export function tokenResponseAPI(user) {
  return async (dispatch) => {
    dispatch(tokenResponse());
    try {
      const { token } = await fetchToken();
      dispatch(startGameSuccess(token, user));
    } catch (error) {
      dispatch(startGameError(error));
    }
  };
}
