import React, { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, moveNumber) => {
    let description;
    if (moveNumber > 0) {
      description = `Go to move #${moveNumber}`;
    } else {
      description = `Go to game start`;
    }
    return (
      <li key={moveNumber}>
        <button onClick={() => jumpTo(moveNumber)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <h3>You are at move: {currentMove}</h3>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
