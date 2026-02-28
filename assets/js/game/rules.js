import { assert } from "../util/assert.js";

export const BOARD_SIZE = 9;

export const WINNING_LINES = Object.freeze(
  [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ].map((line) => Object.freeze(line.slice())),
);

function assertBoard(board) {
  assert(Array.isArray(board) && board.length === BOARD_SIZE, `boardは長さ${BOARD_SIZE}の配列である必要があります`);
}

export function getWinner(board) {
  assertBoard(board);

  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] !== null && board[a] === board[b] && board[b] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }

  return { winner: null, line: null };
}

export function getLegalMoves(board) {
  assertBoard(board);

  const moves = [];
  for (let idx = 0; idx < BOARD_SIZE; idx += 1) {
    if (board[idx] === null) {
      moves.push(idx);
    }
  }
  return moves;
}

export function isLegalMove(board, idx) {
  assertBoard(board);
  return Number.isInteger(idx) && idx >= 0 && idx < BOARD_SIZE && board[idx] === null;
}

export function isBoardFull(board) {
  assertBoard(board);
  return board.every((cell) => cell !== null);
}

export function isDraw(board) {
  const { winner } = getWinner(board);
  return winner === null && isBoardFull(board);
}
