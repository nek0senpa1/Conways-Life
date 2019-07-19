import React from 'react';
import logo from './logo.svg';
import './App.css';

import Holder from './Holder';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <p>
          Conway's Game of Life
        </p>
        
      </header>

      <Holder />

    </div>
  );
}

export default App;
