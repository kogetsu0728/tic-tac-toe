import { els, getCells } from "./dom.js";
import { assert } from "../util/assert.js";

const cells = getCells();

export function render(state, viewModel = {}) {
  assert(state !== null && typeof state === "object", "renderにはstateオブジェクトが必要です");
  assert(typeof viewModel.human === "string", "viewModel.humanが必要です");
  assert(Array.isArray(viewModel.cells) && viewModel.cells.length === cells.length, "viewModel.cellsが不正です");

  els.humanPlayer.value = viewModel.human;

  for (const cell of cells) {
    const idx = Number(cell.dataset.idx);
    const cellVm = viewModel.cells[idx];

    cell.textContent = cellVm.marker ?? "";
    cell.classList.toggle("is-x", cellVm.isX);
    cell.classList.toggle("is-o", cellVm.isO);
    cell.disabled = cellVm.disabled;

    cell.classList.toggle("is-winning", cellVm.isWinning);
  }
}
