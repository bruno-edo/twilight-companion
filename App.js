import React from 'react';

// import { Provider } from 'react-redux';
// import { createStore, combineReducers } from 'redux';
import { Provider as PaperProvider } from 'react-native-paper';

import { AppNavigator } from './src/navigation';

export default class App extends React.Component {
  render() {
    return (
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    );
  }
}
