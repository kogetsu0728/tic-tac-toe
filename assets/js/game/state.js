import { assert } from "../util/assert.js";
import { BOARD_SIZE, getWinner, isLegalMove, isBoardFull } from "./rules.js";
import { PLAYER_X, isPlayer, oppositePlayer } from "./players.js";

function freezeState(state) {
  Object.freeze(state.board);
  if (state.winningLine !== null) {
    Object.freeze(state.winningLine);
  }
  return Object.freeze(state);
}

export function createInitialState({ human }) {
  assert(isPlayer(human), `humanはXかOで指定してください: ${human}`);

  return freezeState({
    board: Array(BOARD_SIZE).fill(null),
    turn: PLAYER_X,
    human,
    ai: oppositePlayer(human),
    isGameOver: false,
    winner: null,
    winningLine: null,
    isDraw: false,
  });
}

export function applyMove(state, idx) {
  assert(!state.isGameOver, "ゲーム終了後に手を打つことはできません");
  assert(isPlayer(state.turn), `不正なturnです: ${state.turn}`);
  assert(isLegalMove(state.board, idx), `不正な手です: idx=${idx}`);

  const nextBoard = state.board.slice();
  nextBoard[idx] = state.turn;

  const { winner, line } = getWinner(nextBoard);
  const draw = winner === null && isBoardFull(nextBoard);
  const nextTurn = winner || draw ? state.turn : oppositePlayer(state.turn);

  return freezeState({
    ...state,
    board: nextBoard,
    turn: nextTurn,
    isGameOver: winner !== null || draw,
    winner,
    winningLine: line,
    isDraw: draw,
  });
}
