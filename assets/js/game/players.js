import { assert } from "../util/assert.js";

export const PLAYER_X = "X";
export const PLAYER_O = "O";

export function isPlayer(value) {
  return value === PLAYER_X || value === PLAYER_O;
}

export function oppositePlayer(player) {
  assert(isPlayer(player), `不正なプレイヤー記号です: ${player}`);
  return player === PLAYER_X ? PLAYER_O : PLAYER_X;
}
