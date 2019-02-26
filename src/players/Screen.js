import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import { RaceCard } from './components/presentation';
import { Creators as PlayerActionCreators } from './Actions';

class PlayerSelectionScreen extends Component {
    static propTypes = {
        players: PropTypes.array.isRequired,
        addPlayer: PropTypes.func.isRequired,
    }

    componentDidMount() {
        for (let index = 0; index < 6; index++) {
            this.props.addPlayer(`Player ${index}`);
        }
    }

    getRaceCard = ({ name, race }) => (<RaceCard playerName={name} race={race} />)

    render() {
        return (
            <FlatList
            data={this.props.players}
            renderItem={({ item }) => this.getRaceCard(item)}
            keyExtractor={(item, index) => `${index}`} />
        );
    };
}

const mapStateToPros = (state) => ({
    players: state.players.players,
});

const mapDispatchToProps = (dispatch) => ({
    addPlayer: name => dispatch(PlayerActionCreators.addPlayer(name)),
});

export default connect(mapStateToPros, mapDispatchToProps)(PlayerSelectionScreen);
