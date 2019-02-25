import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Router, Scene, Stack } from 'react-native-router-flux';

import { PlayerSelectionScreen } from '../players';

class AppNavigator extends Component {
    static propTypes = {
    
    }

    render() {
        return (
            <Router>
                <Stack key='root'>
                    <Scene component={PlayerSelectionScreen} key={'raceSelection'} />
                </Stack>
            </Router>
        );
    };
}

export default AppNavigator;