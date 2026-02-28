import { els, getCells } from "./dom.js";

export function bindUIEvents({ onCellClick, onReset, onHumanChange }) {
  const cells = getCells();

  const cellListeners = cells.map((cell) => {
    const listener = () => {
      const idx = Number(cell.dataset.idx);
      onCellClick?.(idx);
    };
    cell.addEventListener("click", listener);
    return { cell, listener };
  });

  const resetListener = () => onReset?.();
  els.resetBtn.addEventListener("click", resetListener);

  const humanChangeListener = () => {
    const human = els.humanPlayer.value;
    onHumanChange?.(human);
  };
  els.humanPlayer.addEventListener("change", humanChangeListener);

  return function unbindUIEvents() {
    for (const { cell, listener } of cellListeners) {
      cell.removeEventListener("click", listener);
    }
    els.resetBtn.removeEventListener("click", resetListener);
    els.humanPlayer.removeEventListener("change", humanChangeListener);
  };
}
