import fetchToken from '../services/fetchTokenAPI';

export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_RESPONSE = 'TOKEN_RESPONSE';

export const tokenResponse = () => ({
  type: TOKEN_RESPONSE,
});

export const tokenSuccess = (token) => ({
  type: TOKEN_SUCCESS,
  token,
});

export function tokenResponseAPI() {
  return async (dispatch) => {
    dispatch(tokenResponse());
    const { token } = await fetchToken();
    dispatch(tokenSuccess(token));
  };
}
