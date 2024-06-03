import React, { useState } from 'react';
import Player from './Player';
import GameBoard from './GameBoard';
import GameTitle from './GameTitle';
import Rules from './Rules';
import Welcome from './Welcome';

function Game() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [playerNames, setPlayerNames] = useState({ X: 'Player 1', O: 'Player 2' });
  const [showRules, setShowRules] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  function handleSelectSquare(rowIndex, colIndex) {
    if (gameOver) {
      return;
    }

    const currentPlayer = activePlayer;
    setActivePlayer(currentPlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {
      const updatedTurns = [
        ...prevTurns,
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
      ];

      if (checkWin(updatedTurns, currentPlayer)) {
        setGameOver(true);
        setWinner(currentPlayer);
      } else if (updatedTurns.length === 9) {
        setGameOver(true);
        setWinner('TIE');
      }

      return updatedTurns;
    });
  }

  function checkWin(turns, player) {
    const board = Array(3).fill(null).map(() => Array(3).fill(null));
    turns.forEach(({ square, player: turnPlayer }) => {
      board[square.row][square.col] = turnPlayer;
    });

    // Check rows
    for (let row = 0; row < 3; row++) {
      if (board[row][0] === player && board[row][1] === player && board[row][2] === player) {
        return true;
      }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
      if (board[0][col] === player && board[1][col] === player && board[2][col] === player) {
        return true;
      }
    }

    // Check diagonals
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
      return true;
    }
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
      return true;
    }

    return false;
  }

  function handleResetGame() {
    setGameTurns([]);
    setActivePlayer('X');
    setGameOver(false);
    setWinner(null);
  }

  function handleNameChange(symbol, newName) {
    setPlayerNames((prevNames) => ({
      ...prevNames,
      [symbol]: newName,
    }));
  }

  function toggleRules() {
    setShowRules(!showRules);
  }

  function closeWelcome() {
    setShowWelcome(false);
    setShowRules(true);
  }

  return (
    <main className="App-header">
      {showWelcome && (
        <div className="welcome-backdrop" onClick={closeWelcome}>
          <div className="welcome-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeWelcome}>X</button>
            <Welcome />
          </div>
        </div>
      )}
      {showRules && (
        <div className="RulesContainer">
          <div className="Rules">
            <Rules onClose={toggleRules} />
          </div>
        </div>
      )}
      {!showWelcome && !showRules && (
        <div className="RulesButtonContainer">
          <button onClick={toggleRules} className="ShowRules">Show Rules</button>
        </div>
      )}
      <div className="Title">
        <GameTitle />
      </div>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            symbol="X"
            isActive={activePlayer === 'X'}
            initialName={playerNames.X}
            onNameChange={(name) => handleNameChange('X', name)}
          />
          <Player
            symbol="O"
            isActive={activePlayer === 'O'}
            initialName={playerNames.O}
            onNameChange={(name) => handleNameChange('O', name)}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
          gameOver={gameOver}
          onResetGame={handleResetGame}
          winner={winner === 'TIE' ? 'TIE' : playerNames[winner]}
        />
      </div>
    </main>
  );
}

export default Game;
