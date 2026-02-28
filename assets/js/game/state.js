import { assert } from "../util/assert.js";
import { getWinner, isLegalMove, isDraw } from "./rules.js";

function oppositePlayer(player) {
  assert(player === "X" || player === "O", `不正なプレイヤー記号です: ${player}`);
  return player === "X" ? "O" : "X";
}

function freezeState(state) {
  Object.freeze(state.board);
  if (state.winningLine !== null) {
    Object.freeze(state.winningLine);
  }
  return Object.freeze(state);
}

export function createInitialState({ human }) {
  assert(human === "X" || human === "O", `humanはXかOで指定してください: ${human}`);

  return freezeState({
    board: Array(9).fill(null),
    turn: "X",
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
  assert(state.turn === "X" || state.turn === "O", `不正なturnです: ${state.turn}`);
  assert(isLegalMove(state.board, idx), `不正な手です: idx=${idx}`);

  const nextBoard = state.board.slice();
  nextBoard[idx] = state.turn;

  const { winner, line } = getWinner(nextBoard);
  const draw = winner === null && isDraw(nextBoard);
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
