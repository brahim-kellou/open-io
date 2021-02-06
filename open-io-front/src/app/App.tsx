import React from 'react';
import { ChakraProvider } from "@chakra-ui/react"
import HomeView from '../views/HomeView';

function App() {
  return (
    <ChakraProvider>
      <HomeView />
    </ChakraProvider>
  );
}

export default App;
