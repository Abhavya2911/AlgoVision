export function nQueensSteps(n) {
  let board = Array.from({ length: n }, () => Array(n).fill(0));
  let steps = [];

  function isSafe(row, col) {
    // column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 1) return false;
    }

    // left diagonal
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) return false;
    }

    // right diagonal
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 1) return false;
    }

    return true;
  }

  function solve(row) {
    if (row === n) {
      steps.push({
        type: "solution",
        board: board.map(r => [...r]),
        message: "Solution found!"
      });
      return true;
    }

    for (let col = 0; col < n; col++) {

      steps.push({
        type: "try",
        board: board.map(r => [...r]),
        row,
        col,
        message: `Trying row ${row}, col ${col}`
      });

      if (isSafe(row, col)) {

        board[row][col] = 1;

        steps.push({
          type: "place",
          board: board.map(r => [...r]),
          row,
          col,
          message: `Placed queen at (${row}, ${col})`
        });

        if (solve(row + 1)) return true;

        // 🔥 BACKTRACK
        board[row][col] = 0;

        steps.push({
          type: "remove",
          board: board.map(r => [...r]),
          row,
          col,
          message: `Backtracking from (${row}, ${col})`
        });
      }
    }

    return false;
  }

  solve(0);
  return steps;
}