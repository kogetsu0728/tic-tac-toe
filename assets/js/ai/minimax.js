import { getLegalMoves, getWinner } from "../game/rules.js";
import { oppositePlayer } from "../game/players.js";

export function minimax(board, currentPlayer, maximizingPlayer, alpha = -Infinity, beta = Infinity, depth = 0) {
  const { winner } = getWinner(board);
  if (winner === maximizingPlayer) {
    return { move: null, score: 10 - depth };
  }
  if (winner === oppositePlayer(maximizingPlayer)) {
    return { move: null, score: depth - 10 };
  }

  const legalMoves = getLegalMoves(board);
  if (legalMoves.length === 0) {
    return { move: null, score: 0 };
  }

  const isMaximizingTurn = currentPlayer === maximizingPlayer;

  if (isMaximizingTurn) {
    let bestMove = null;
    let bestScore = -Infinity;

    for (const move of legalMoves) {
      const nextBoard = board.slice();
      nextBoard[move] = currentPlayer;

      const result = minimax(nextBoard, oppositePlayer(currentPlayer), maximizingPlayer, alpha, beta, depth + 1);
      const isTieBreakBetter = bestMove === null || move < bestMove;
      if (result.score > bestScore || (result.score === bestScore && isTieBreakBetter)) {
        bestMove = move;
        bestScore = result.score;
      }

      alpha = Math.max(alpha, result.score);
      if (beta <= alpha) {
        break;
      }
    }

    return { move: bestMove, score: bestScore };
  }

  let bestMove = null;
  let bestScore = Infinity;
  for (const move of legalMoves) {
    const nextBoard = board.slice();
    nextBoard[move] = currentPlayer;

    const result = minimax(nextBoard, oppositePlayer(currentPlayer), maximizingPlayer, alpha, beta, depth + 1);
    const isTieBreakBetter = bestMove === null || move < bestMove;
    if (result.score < bestScore || (result.score === bestScore && isTieBreakBetter)) {
      bestMove = move;
      bestScore = result.score;
    }

    beta = Math.min(beta, result.score);
    if (beta <= alpha) {
      break;
    }
  }

  return { move: bestMove, score: bestScore };
}
