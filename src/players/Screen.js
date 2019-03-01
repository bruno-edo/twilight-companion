import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Constants as ExpoConstants } from 'expo';
import { View, Animated, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { RaceCard } from './components/presentation';
import { Creators as PlayerActionCreators } from './Actions';

const HEADER_EXPANDED_HEIGHT = 300 + ExpoConstants.statusBarHeight;
const HEADER_COLLAPSED_HEIGHT = 30 + ExpoConstants.statusBarHeight;
const { width: SCREEN_WIDTH } = Dimensions.get('screen')

class PlayerSelectionScreen extends Component {
    static propTypes = {
        players: PropTypes.array.isRequired,
        addPlayer: PropTypes.func.isRequired,
        removePlayer: PropTypes.func.isRequired,
        setSpeaker: PropTypes.func.isRequired,
        rerollRace: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0),
        };

    }

    componentDidMount() {
        if(this.props.players.length  === 0) {
            for (let index = 0; index < 6; index++) {
                this.props.addPlayer(`Bruno Eduardo D'Angelo de Oliveira ${index}`);
            }
            this.props.setSpeaker();
        }
    }

    getRaceCard = ({id, name, race, isSpeaker}) => (
        <RaceCard
        key={id} id={id} playerName={name} race={race} isSpeaker={isSpeaker}
        callbackRemovePlayer={this.props.removePlayer}
        callbackReroll={this.props.rerollRace} />)

    render() {
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
            outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
            extrapolate: 'clamp'
        })

        return (
            <View style={{ flex: 1 }}>
                <Animated.View
                    style={{ height: headerHeight, backgroundColor: 'red', width: SCREEN_WIDTH, position: 'absolute', top: 0, left: 0, overflow: 'hidden', zIndex: 1 }}
                >
                </Animated.View>
                <ScrollView
                contentContainerStyle={{ paddingTop: HEADER_EXPANDED_HEIGHT + 30 }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                )}
                scrollEventThrottle={16}
                onContentSizeChange={this.onContentSizeChange}>
                    {
                        this.props.players.map(element => {
                            return this.getRaceCard(element);
                        })
                    }
                </ScrollView>
            </View>
        );
    };
}

const mapStateToPros = (state) => ({
    players: state.players.players,
});

const mapDispatchToProps = (dispatch) => ({
    addPlayer: name => dispatch(PlayerActionCreators.addPlayer(name)),
    removePlayer: id => dispatch(PlayerActionCreators.removePlayer(id)),
    setSpeaker: () => dispatch(PlayerActionCreators.setSpeaker()),
    rerollRace: id => dispatch(PlayerActionCreators.rerollRace(id)),
});

export default connect(mapStateToPros, mapDispatchToProps)(PlayerSelectionScreen);
