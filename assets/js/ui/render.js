import { els, getCells } from "./dom.js";

const cells = getCells();

function statusTextFromState(state) {
  if (state.isGameOver) {
    if (state.winner !== null) {
      return `${state.winner} の勝ち`;
    }
    return "引き分け";
  }

  const actor = state.turn === state.human ? "あなた" : "AI";
  return `手番: ${state.turn}（${actor}）`;
}

export function render(state, viewModel = {}) {
  const locked = Boolean(viewModel.locked);

  els.statusText.textContent = statusTextFromState(state);
  els.humanPlayer.value = state.human;

  for (const cell of cells) {
    const idx = Number(cell.dataset.idx);
    const marker = state.board[idx];
    cell.textContent = marker ?? "";
    cell.classList.toggle("is-x", marker === "X");
    cell.classList.toggle("is-o", marker === "O");

    const isPlayable = !locked && !state.isGameOver && state.turn === state.human && marker === null;
    cell.disabled = !isPlayable;

    const isWinningCell = state.winningLine !== null && state.winningLine.includes(idx);
    cell.classList.toggle("is-winning", isWinningCell);
  }
}
