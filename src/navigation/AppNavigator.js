import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Router, Scene, Tabs } from 'react-native-router-flux';

import { PlayerSelectionScreen } from '../players';

class AppNavigator extends Component {
    static propTypes = {
    
    }

    render() {
        return (
            <Router>
                <Tabs
                key='root'
                tabBarPosition={'bottom'}>
                    <Scene component={PlayerSelectionScreen} key={'raceSelection'} hideNavBar />
                </Tabs>
            </Router>
        );
    };
}

export default AppNavigator;