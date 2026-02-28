import { PLAYER_X, PLAYER_O } from "../game/players.js";

function createStatusText(state) {
  if (state.isGameOver) {
    if (state.winner === null) {
      return "引き分け";
    }
    return state.winner === state.human ? "あなたの勝ち" : "AIの勝ち";
  }

  const actor = state.turn === state.human ? "あなた" : "AI";
  return `手番: ${state.turn}（${actor}）`;
}

export function createViewModel(state, { locked = false } = {}) {
  const isHumanTurn = state.turn === state.human;
  const winningCells = new Set(state.winningLine ?? []);

  return {
    statusText: createStatusText(state),
    human: state.human,
    cells: state.board.map((marker, idx) => ({
      idx,
      marker,
      isX: marker === PLAYER_X,
      isO: marker === PLAYER_O,
      isWinning: winningCells.has(idx),
      disabled: locked || state.isGameOver || !isHumanTurn || marker !== null,
    })),
  };
}
