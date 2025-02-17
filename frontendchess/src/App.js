import { useReducer } from 'react';
import './App.css';
import Board from './components/Board/Board.js'
import AppContext from './contexts/Context.js';
import { reducer } from './reducers/Reducer.js';
import { initGameState } from './constants.js';

function App() {

  const [appState, dispatch] = useReducer(reducer, initGameState)
  const provideState = {
    appState,
    dispatch
  }

  return (
    <AppContext.Provider value={provideState}>
      <div className="App">
        <Board/>
      </div>
    </AppContext.Provider>
  );
}

export default App;
