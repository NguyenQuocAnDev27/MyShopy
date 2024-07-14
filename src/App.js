// src/App.js
import React from 'react';
import {StoreProvider} from './stores';
import AppNavigator from './navigation/AppNavigator';

const App = () => (
  <StoreProvider>
    <AppNavigator />
  </StoreProvider>
);

export default App;
