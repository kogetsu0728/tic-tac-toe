import { getLegalMoves, getWinner, isDraw } from "../game/rules.js";

function oppositePlayer(player) {
  return player === "X" ? "O" : "X";
}

function evaluateTerminal(board, maximizingPlayer, depth) {
  const { winner } = getWinner(board);
  if (winner === maximizingPlayer) {
    return 10 - depth;
  }
  if (winner === oppositePlayer(maximizingPlayer)) {
    return depth - 10;
  }
  if (isDraw(board)) {
    return 0;
  }
  return null;
}

export function minimax(board, currentPlayer, maximizingPlayer, alpha = -Infinity, beta = Infinity, depth = 0) {
  const terminalScore = evaluateTerminal(board, maximizingPlayer, depth);
  if (terminalScore !== null) {
    return { move: null, score: terminalScore };
  }

  const legalMoves = getLegalMoves(board);
  const isMaximizingTurn = currentPlayer === maximizingPlayer;

  if (isMaximizingTurn) {
    let best = { move: legalMoves[0], score: -Infinity };
    for (const move of legalMoves) {
      const nextBoard = board.slice();
      nextBoard[move] = currentPlayer;

      const result = minimax(nextBoard, oppositePlayer(currentPlayer), maximizingPlayer, alpha, beta, depth + 1);
      if (result.score > best.score || (result.score === best.score && move < best.move)) {
        best = { move, score: result.score };
      }

      alpha = Math.max(alpha, result.score);
      if (beta <= alpha) {
        break;
      }
    }
    return best;
  }

  let best = { move: legalMoves[0], score: Infinity };
  for (const move of legalMoves) {
    const nextBoard = board.slice();
    nextBoard[move] = currentPlayer;

    const result = minimax(nextBoard, oppositePlayer(currentPlayer), maximizingPlayer, alpha, beta, depth + 1);
    if (result.score < best.score || (result.score === best.score && move < best.move)) {
      best = { move, score: result.score };
    }

    beta = Math.min(beta, result.score);
    if (beta <= alpha) {
      break;
    }
  }

  return best;
}
