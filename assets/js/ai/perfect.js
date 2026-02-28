import { minimax } from "./minimax.js";
import { getLegalMoves } from "../game/rules.js";
import { assert } from "../util/assert.js";

const cache = new Map();

function createKey(board, player) {
  return `${board.map((v) => v ?? "-").join("")}:${player}`;
}

export function getBestMove(board, player) {
  assert(player === "X" || player === "O", `playerはXかOで指定してください: ${player}`);

  const key = createKey(board, player);
  if (cache.has(key)) {
    return cache.get(key);
  }

  const legalMoves = getLegalMoves(board);
  assert(legalMoves.length > 0, "合法手がないため最善手を計算できません");

  const { move } = minimax(board, player, player);
  const bestMove = move ?? legalMoves[0];
  cache.set(key, bestMove);
  return bestMove;
}
