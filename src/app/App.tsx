import React from 'react';
import './App.css';
import ObjectDetection from '../components/ObjectDetection';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ObjectDetection
          width={600}
          height={500}
        />
      </header>
    </div>
  );
}

export default App;
