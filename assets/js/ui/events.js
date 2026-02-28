import { els, getCells } from "./dom.js";

export function bindUIEvents({ onCellClick, onReset, onHumanChange }) {
  getCells();

  const boardClickListener = (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    const cell = target.closest(".cell[data-idx]");
    if (cell === null || !els.board.contains(cell)) {
      return;
    }

    const idx = Number(cell.dataset.idx);
    if (Number.isInteger(idx)) {
      onCellClick?.(idx);
    }
  };
  els.board.addEventListener("click", boardClickListener);

  const resetListener = () => onReset?.();
  els.resetBtn.addEventListener("click", resetListener);

  const humanChangeListener = () => {
    const human = els.humanPlayer.value;
    onHumanChange?.(human);
  };
  els.humanPlayer.addEventListener("change", humanChangeListener);

  return function unbindUIEvents() {
    els.board.removeEventListener("click", boardClickListener);
    els.resetBtn.removeEventListener("click", resetListener);
    els.humanPlayer.removeEventListener("change", humanChangeListener);
  };
}
