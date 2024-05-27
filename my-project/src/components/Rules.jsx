import React from 'react';

function Rules({ onClose }) {
  return (
    <div className="rules-container">
      <button className="close-button" onClick={onClose}>X</button>
      <div className="rules-content">
      <div className="Rules">
      <h1>Rules</h1>

      <div className="info">
        <ul>
          <li>
            <h2 className="objective">Objective:</h2>
            Be the first player to get three of your symbols (either "X" or "O") in a row, column, or diagonal.
          </li>
          <li>
            <h2>Board</h2>
            The game is played on a 3x3 grid.
          </li>
          <li>
            <h2>Start:</h2>
            The game starts with an empty grid.
          </li>
          <li>
            <h2>Turns</h2>
            You and your friend take turns. One uses "X", the other "O". The "X" player goes first.
          </li>
          <li>
            <h2>Play</h2>
            Pick an empty square to mark with your symbol.
          </li>
          <li>
            <h2>Win</h2>
            Get three Xs or three Os in a row, column, or diagonal, you win!!!
          </li>
          <li>
            <h2>Tie</h2>
            If all squares are filled and no one wins, it's a tie.
          </li>
          <li>
            <h2>Play Again</h2>
            Simply click reset to start a new game.
          </li>
          <li>
            <h2>HAVE FUN!!!😘😘😘</h2>
          </li>
        </ul>
      </div>
    </div>
      </div>
    </div>
  );
}

export default Rules;

