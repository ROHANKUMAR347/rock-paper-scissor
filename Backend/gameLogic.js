const getResult = (player1, player2, move) => {
  const moves = { rock: "scissors", scissors: "paper", paper: "rock" };
  let result;
  if (move === player1.move) {
    result = "draw";
  } else if (moves[move] === player2.move) {
    player1.score += 1;
    result = "win";
  } else {
    player2.score += 1;
    result = "lose";
  }
  return { player1, player2, result };
};

module.exports = { getResult };
