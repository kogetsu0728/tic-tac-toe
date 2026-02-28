import { GameEngine } from "./game/engine.js";
import { render } from "./ui/render.js";
import { bindUIEvents } from "./ui/events.js";
import { els } from "./ui/dom.js";

function normalizeHuman(value) {
  return value === "O" ? "O" : "X";
}

const engine = new GameEngine({ human: normalizeHuman(els.humanPlayer.value) });

function redraw(viewModel) {
  render(engine.getState(), viewModel);
}

function playAITurnIfNeeded() {
  if (engine.canAIMove()) {
    engine.stepAI();
    redraw();
  }
}

function startNewGame(human) {
  engine.startNewGame({ human: normalizeHuman(human) });
  redraw();
  playAITurnIfNeeded();
}

bindUIEvents({
  onCellClick(idx) {
    engine.stepHuman(idx);
    redraw();
    playAITurnIfNeeded();
  },
  onReset() {
    startNewGame(els.humanPlayer.value);
  },
  onHumanChange(human) {
    startNewGame(human);
  },
});

startNewGame(els.humanPlayer.value);
