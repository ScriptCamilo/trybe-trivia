export default function upLocalStorageScore(newScore) {
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
