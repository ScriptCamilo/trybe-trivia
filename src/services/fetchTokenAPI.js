const fetchToken = async () => {
  const fetchUrl = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = await fetchUrl.json();
  return response;
};

export default fetchToken;
