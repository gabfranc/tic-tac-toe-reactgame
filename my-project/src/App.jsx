import { useState } from 'react';
import './App.css';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
function App() {
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare() {
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O': 'X');
  }
  return <main className="App-header">
    <div id="game-container">
      {/*PLAYERS **/}
      <ol id="players" className="highlight-player">
        <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
        <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
      </ol>
     {/** GAME BOARD*/}
      <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
     {/*** LOG */}
    </div>
  </main>
}

export default App;
