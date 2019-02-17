import React from 'react';

// import { Provider } from 'react-redux';
// import { createStore, combineReducers } from 'redux';
import { AppNavigator } from './src/navigation';

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}
