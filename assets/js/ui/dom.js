import { assert } from "../util/assert.js";

function qs(selector) {
  const element = document.querySelector(selector);
  assert(element !== null, `DOM要素が見つかりません: ${selector}`);
  return element;
}

export function getCells() {
  const cells = Array.from(els.board.querySelectorAll(".cell[data-idx]"));
  assert(cells.length === 9, `セル数が不正です。期待値:9, 実際:${cells.length}`);

  const sorted = cells.slice().sort((a, b) => Number(a.dataset.idx) - Number(b.dataset.idx));
  sorted.forEach((cell, expectedIdx) => {
    assert(Number(cell.dataset.idx) === expectedIdx, `data-idxが連番ではありません: ${cell.dataset.idx}`);
  });

  return sorted;
}

export const els = {
  board: qs("#board"),
  resetBtn: qs("#reset-btn"),
  humanPlayer: qs("#human-player"),
};
