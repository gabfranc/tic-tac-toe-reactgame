import './App.css';
import Player from './components/Player.jsx'
function App() {
  return <main className="App-header">
    <div id="game-container">
      {/*PLAYERS **/}
      <ol id="players">
        <Player name="Player 1" symbol="X" />
        <Player name="Player 2" symbol="O" />
      </ol>
     {/** GAME BOARD*/}

     {/*** LOG */}
    </div>
  </main>
}

export default App;
