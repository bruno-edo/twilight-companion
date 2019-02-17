import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { View, Text, StyleSheet } from 'react-native';

class RaceSelectionScreen extends Component {
    static propTypes = {
    
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>
            </View>
        );
    };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RaceSelectionScreen;