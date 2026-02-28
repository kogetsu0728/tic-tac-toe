import { assert } from "../util/assert.js";

function qs(selector) {
  const element = document.querySelector(selector);
  assert(element !== null, `DOM要素が見つかりません: ${selector}`);
  return element;
}

export function getCells() {
  const cells = Array.from(document.querySelectorAll(".cell[data-idx]"));
  assert(cells.length === 9, `セル数が不正です。期待値:9, 実際:${cells.length}`);
  return cells;
}

export const els = {
  board: qs("#board"),
  statusText: qs("#status-text"),
  resetBtn: qs("#reset-btn"),
  humanPlayer: qs("#human-player"),
};
