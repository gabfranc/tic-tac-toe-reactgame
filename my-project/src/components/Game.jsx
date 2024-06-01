import React, { useState, useEffect } from 'react';
import Player from './Player.jsx';
import GameBoard from './GameBoard.jsx';
import GameTitle from './GameTitle.jsx';
import Rules from './Rules.jsx';
import Welcome from './Welcome.jsx';
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

function Game() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [playerNames, setPlayerNames] = useState({ X: 'Player 1', O: 'Player 2' });
  const [showRules, setShowRules] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('game_update', (gameState) => {
      setGameTurns(gameState.turns);
      setActivePlayer(gameState.active_player);
      setGameOver(gameState.game_over);
      setWinner(gameState.winner);
    });

    return () => {
      socket.off('connect');
      socket.off('game_update');
    };
  }, []);

  function handleSelectSquare(rowIndex, colIndex) {
    if (gameOver) {
      return;
    }

    const currentPlayer = activePlayer;
    const newTurn = { square: { row: rowIndex, col: colIndex }, player: currentPlayer };
    socket.emit('new_turn', newTurn);
  }

  function handleResetGame() {
    socket.emit('reset_game');
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showWelcome && !document.querySelector('.welcome-popup').contains(event.target)) {
        closeWelcome();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showWelcome]);

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
        {/* PLAYERS */}
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
        {/* GAME BOARD */}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
          activePlayerSymbol={activePlayer}
          gameOver={gameOver}
          onResetGame={handleResetGame}
        />
        {/* WINNER MESSAGE */}
        {gameOver && (
          <div className="winner-message">
            {winner === 'TIE' ? "It's a tie!" : `${playerNames[winner]} wins!`}
          </div>
        )}
      </div>
    </main>
  );
}

export default Game;
