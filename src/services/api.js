export const fetchToken = async () => {
  const fetchUrl = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = await fetchUrl.json();
  localStorage.setItem('token', JSON.stringify(response.token));
  return response;
};

export const fetchQuestions = async () => {
  await fetchToken();
  const token = localStorage.getItem('token').replace(/"/g, '');
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const questions = await response.json();
  return questions;
};
