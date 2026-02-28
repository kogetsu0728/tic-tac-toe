import { GameEngine } from "./game/engine.js";
import { PLAYER_X, isPlayer } from "./game/players.js";
import { render } from "./ui/render.js";
import { bindUIEvents } from "./ui/events.js";
import { createViewModel } from "./ui/view-model.js";
import { els } from "./ui/dom.js";

function normalizeHuman(value) {
  return isPlayer(value) ? value : PLAYER_X;
}

const engine = new GameEngine({ human: normalizeHuman(els.humanPlayer.value) });

function redraw({ locked = false } = {}) {
  const state = engine.getState();
  const viewModel = createViewModel(state, { locked });
  render(state, viewModel);
}

function settleAIMoves() {
  while (engine.canAIMove()) {
    engine.stepAI();
  }
}

function startNewGame(human) {
  engine.startNewGame({ human: normalizeHuman(human) });
  settleAIMoves();
  redraw();
}

function stepHumanThenAI(idx) {
  engine.stepHuman(idx);
  settleAIMoves();
  redraw();
}

function safelyRun(action) {
  try {
    action();
  } catch (error) {
    console.error(error);
    redraw();
  }
}

bindUIEvents({
  onCellClick(idx) {
    safelyRun(() => stepHumanThenAI(idx));
  },
  onReset() {
    safelyRun(() => startNewGame(els.humanPlayer.value));
  },
  onHumanChange(human) {
    safelyRun(() => startNewGame(human));
  },
});

safelyRun(() => startNewGame(els.humanPlayer.value));
