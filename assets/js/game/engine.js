import { createInitialState, applyMove } from "./state.js";
import { getBestMove } from "../ai/perfect.js";
import { isLegalMove } from "./rules.js";
import { PLAYER_X } from "./players.js";

export class GameEngine {
  constructor({ human = PLAYER_X, selectBestMove = getBestMove } = {}) {
    this.selectBestMove = selectBestMove;
    this.state = createInitialState({ human });
  }

  getState() {
    return this.state;
  }

  startNewGame({ human }) {
    this.state = createInitialState({ human });
    return this.state;
  }

  canHumanMove() {
    return !this.state.isGameOver && this.state.turn === this.state.human;
  }

  canAIMove() {
    return !this.state.isGameOver && this.state.turn === this.state.ai;
  }

  stepHuman(idx) {
    if (!this.canHumanMove()) {
      return this.state;
    }
    if (!isLegalMove(this.state.board, idx)) {
      return this.state;
    }
    this.state = applyMove(this.state, idx);
    return this.state;
  }

  stepAI() {
    if (!this.canAIMove()) {
      return this.state;
    }

    const move = this.selectBestMove(this.state.board, this.state.ai);
    this.state = applyMove(this.state, move);
    return this.state;
  }
}
