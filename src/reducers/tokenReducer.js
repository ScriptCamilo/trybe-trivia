const INITIAL_STATE = {
  token: false,
};

const getToken = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SUCCESS':
    return state;
  default: return state;
  }
};

export default getToken;
