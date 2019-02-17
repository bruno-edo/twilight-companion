import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Router, Scene, Stack } from 'react-native-router-flux';

import { RaceSelectionScreen } from '../raceSelector';

class AppNavigator extends Component {
    static propTypes = {
    
    }

    render() {
        return (
            <Router>
                <Stack key='root'>
                    <Scene component={RaceSelectionScreen} key={'raceSelection'} />
                </Stack>
            </Router>
        );
    };
}

export default AppNavigator;