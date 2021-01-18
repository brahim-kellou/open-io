import React from 'react';
import { ChakraProvider } from "@chakra-ui/react"
import './App.css';
import HomeView from '../views/HomeView';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <HomeView />
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
