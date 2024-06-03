import React, { useEffect, useState } from 'react';
import './GameBoard.css';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns, gameOver, onResetGame, winner }) {
  const [board, setBoard] = useState(initialGameBoard);

  useEffect(() => {
    const newBoard = initialGameBoard.map((row) => row.slice());
    turns.forEach(({ square, player }) => {
      const { row, col } = square;
      newBoard[row][col] = player;
    });
    setBoard(newBoard);
  }, [turns]);

  return (
    <div className="game-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="game-row">
          {row.map((playerSymbol, colIndex) => (
            <ul key={colIndex} className="game-cell">
              <li>
                <button
                  className="game-button"
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={gameOver || playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            </ul>
          ))}
        </div>
      ))}
      {gameOver && (
        <div className="game-modal">
          <div className="game-modal-content">
            <button className="modal-close-button" onClick={onResetGame}>X</button>
            <div className="modal-message">
              {winner === 'TIE' ? "It's a Tie!" : `${winner} wins!`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
