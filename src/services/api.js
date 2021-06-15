export const fetchToken = async () => {
  const fetchUrl = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = await fetchUrl.json();
  localStorage.setItem('token', JSON.stringify(response.token));
  return response;
};

export const fetchQuestions = async () => {
  let token = localStorage.getItem('token').replace(/"/g, '');
  let response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  let questions = await response.json();

  const expiredToken = 3;
  if (questions.response_code === expiredToken) {
    await fetchToken();
    token = localStorage.getItem('token').replace(/"/g, '');
    response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    questions = await response.json();
  }

  return questions;
};
