import React, { useState } from 'react';
import './App.css';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  function handleSelectSquare(rowIndex, colIndex) {
    if (gameOver) {
      return;
    }

    const currentPlayer = activePlayer;
    setActivePlayer(currentPlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
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

  function handleResetGame() {
    setGameTurns([]);
    setActivePlayer('X');
    setGameOver(false);
    setWinner(null);
  }

  function checkWin(turns, player) {
    // Implementation of checkWin function
  }

  return (
    <main className="App-header">
      <div id="game-container">
        {/* PLAYERS */}
        <ol id="players" className="highlight-player">
          <Player symbol="X" isActive={activePlayer === 'X'} />
          <Player symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        {/* GAME BOARD */}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
          activePlayerSymbol={activePlayer}
          gameOver={gameOver}
          onResetGame={handleResetGame} // Ensure onResetGame is passed as a prop
        />
        {/* WINNER MESSAGE */}
        {gameOver && (
          <div className="winner-message">
            {winner === 'TIE' ? "It's a tie!" : `${winner} wins!`}
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
