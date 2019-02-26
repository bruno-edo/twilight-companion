import React from 'react';

import { createStore, combineReducers } from 'redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

import { AppNavigator } from './src/navigation';
import { PlayerReducers } from './src/players'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const reducers = combineReducers({
      players: PlayerReducers,
    });

    this.store = createStore(reducers);
  };

  render() {
    return (
      <Provider store={this.store}>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </Provider>
    );
  }
}
