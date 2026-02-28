import { minimax } from "./minimax.js";
import { getLegalMoves } from "../game/rules.js";
import { assert } from "../util/assert.js";
import { isPlayer } from "../game/players.js";

const cache = new Map();

function createKey(board, player) {
  return `${board.map((v) => v ?? "-").join("")}:${player}`;
}

export function getBestMove(board, player) {
  assert(isPlayer(player), `playerはXかOで指定してください: ${player}`);

  const legalMoves = getLegalMoves(board);
  assert(legalMoves.length > 0, "合法手がないため最善手を計算できません");

  const key = createKey(board, player);
  const cachedMove = cache.get(key);
  if (cachedMove !== undefined && legalMoves.includes(cachedMove)) {
    return cachedMove;
  }

  const { move } = minimax(board, player, player);
  const bestMove = move ?? legalMoves[0];
  cache.set(key, bestMove);
  return bestMove;
}

export function clearBestMoveCache() {
  cache.clear();
}
