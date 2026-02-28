import { assert } from "../util/assert.js";

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function getWinner(board) {
  assert(Array.isArray(board) && board.length === 9, "boardは長さ9の配列である必要があります");

  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] !== null && board[a] === board[b] && board[b] === board[c]) {
      return { winner: board[a], line };
    }
  }

  return { winner: null, line: null };
}

export function getLegalMoves(board) {
  assert(Array.isArray(board) && board.length === 9, "boardは長さ9の配列である必要があります");
  return board.flatMap((cell, idx) => (cell === null ? [idx] : []));
}

export function isLegalMove(board, idx) {
  assert(Array.isArray(board) && board.length === 9, "boardは長さ9の配列である必要があります");
  return Number.isInteger(idx) && idx >= 0 && idx < 9 && board[idx] === null;
}

export function isDraw(board) {
  const { winner } = getWinner(board);
  return winner === null && getLegalMoves(board).length === 0;
}
