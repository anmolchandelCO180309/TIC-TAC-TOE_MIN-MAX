function bestMove() {
  // computer to make its turn
  // maximizer takes first turn which has worst-case initial value =- infinity
  // Minimizer will take next turn which has worst-case initial value = +infinity.
  let bestScore = -Infinity;
  let move;
  for (let m = 0; m < 3; m++) {
    for (let n = 0; n < 3; n++) {
      // Is the spot available?
      if (board[m][n] == '') {
        board[m][n] = computer;
        let score = minimax(board, 0, false);
        board[m][n] = '';
        if (score > bestScore) {
          bestScore = score;
          move = { m, n };
        }
      }
    }
  }
  board[move.m][move.n] = computer;
  currentPlayer = human;
}

let scores = {
  X: 10,
  O: -10,
  tie: 0
};

function minimax(board, depth, isMaximizing) {
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }
//Maxmizing function. (Maximizer will try to get the Maximum possible score.)
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let m = 0; m < 3; m++) {
      for (let n = 0; n < 3; n++) {
        // Is the spot available?
        if (board[m][n] == '') {
          board[m][n] = computer;
          let score = minimax(board, depth + 1, false);
          board[m][n] = '';
          bestScore = max(score, bestScore);  //return the max score 
        }
      }
    }
    return bestScore;
  } else {
    //Minimizing function (Minimizer will try to get the minimum possible score.)
    let bestScore = Infinity;
    for (let m = 0; m < 3; m++) {
      for (let n = 0; n < 3; n++) {
        // Is the spot available?
        if (board[m][n] == '') {
          board[m][n] = human;
          let score = minimax(board, depth + 1, true);
          board[m][n] = '';
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}