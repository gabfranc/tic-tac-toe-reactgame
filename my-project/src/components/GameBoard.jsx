import React from 'react';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns, gameOver, onResetGame }) {
  const buttonStyle = {
    width: '15vh',
    height: '15vh',
    textAlign: 'center',
    lineHeight: '15vh',
    fontSize: '74px',
    fontFamily: 'Rubik Mono One, monospace',
    borderRadius: '5px',
    border: 'none',
    margin: '10px',
  };

  let gameBoard = initialGameBoard.map((row) => row.slice());

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return (
    <div style={{ display: 'inline-block' }}>
      {gameBoard.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', justifyContent: 'center' }}>
          {row.map((playerSymbol, colIndex) => (
            <ul key={colIndex} style={{ padding: 0, margin: 0, listStyleType: 'none' }}>
              <li>
                <button
                  style={buttonStyle}
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
        <div style={{ textAlign: 'center' }}>
          <button onClick={onResetGame}>Reset Game</button>
        </div>
      )}
    </div>
  );
}
