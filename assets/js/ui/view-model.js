import { PLAYER_X, PLAYER_O } from "../game/players.js";

export function createViewModel(state, { locked = false } = {}) {
  const isHumanTurn = state.turn === state.human;
  const winningCells = new Set(state.winningLine ?? []);

  return {
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
