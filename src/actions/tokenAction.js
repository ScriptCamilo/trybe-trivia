import { fetchToken } from '../services/api';

export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_RESPONSE = 'TOKEN_RESPONSE';

export const tokenResponse = () => ({
  type: TOKEN_RESPONSE,
});

export const startGameSuccess = (token, user) => ({
  type: TOKEN_SUCCESS,
  token,
  user,
});

export function tokenResponseAPI(user) {
  return async (dispatch) => {
    dispatch(tokenResponse());
    const { token } = await fetchToken();
    dispatch(startGameSuccess(token, user));
  };
}
