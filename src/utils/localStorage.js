export function upLocalStorageScore(newScore) {
  const state = JSON.parse(localStorage.getItem('state'));

  if (state) {
    const { player } = state;
    localStorage.setItem('state', JSON.stringify({
      player: {
        ...player,
        assertions: player.assertions + 1,
        score: player.score + newScore,
      },
    }));
  }
}

export function setPlayerInRanking() {
  const { player } = JSON.parse(localStorage.getItem('state'));
  const { name, score, gravatarEmail } = player;
  const newPlayer = { name, score, picture: gravatarEmail };

  const getStoragedRanking = () => JSON.parse(localStorage.getItem('ranking'));
  const ranking = getStoragedRanking() ? getStoragedRanking() : [];

  ranking.push(newPlayer);
  ranking.sort((a, b) => b.score - a.score);
  localStorage.setItem('ranking', JSON.stringify(ranking));
}

export function getRanking() {
  const ranking = JSON.parse(localStorage.getItem('ranking'));

  return ranking;
}
