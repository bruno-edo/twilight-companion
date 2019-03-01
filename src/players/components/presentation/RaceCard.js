import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { Image, View, Text, Animated, Easing } from 'react-native';
import { Card, Chip, TouchableRipple } from 'react-native-paper';
import { SwipeRow } from 'react-native-swipe-list-view';

import Style from '../../style';

class RaceCard extends Component {
    static propTypes = {
        race: PropTypes.object,
        id: PropTypes.number.isRequired,
        playerName: PropTypes.string.isRequired,
        isSpeaker: PropTypes.bool.isRequired,
        callbackRemovePlayer: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.animationIsRunning = false;
        this.heightAnimation = new Animated.Value();
    }

    rerollButtonPress = () => {
        this.swipeRowRef.closeRow();
    }

    onSwipeValueChange = (swipeData) => {
        const { value } = swipeData;
        if (value > 150 && !this.animationIsRunning) {
            this.animationIsRunning = true;
            this.heightAnimation.setValue(this.maxHeight);
            Animated.timing(
                this.heightAnimation,
                {
                    toValue: 0,
                    duration: 200,
                }
            ).start(() => this.props.callbackRemovePlayer(this.props.id));
        }
    }

    render() {
        return (
            <Animated.View onLayout={(event) => {
                this.maxHeight = event.nativeEvent.layout.height;
            }}
            style={{ height: this.heightAnimation }}>
                <SwipeRow rightOpenValue={-75} stopLeftSwipe={250} stopRightSwipe={-75} ref={ref => this.swipeRowRef = ref} onSwipeValueChange={this.onSwipeValueChange} onBlur={() => console.log('blur')}>
                    <View style={[Style.raceCardUnderlay, Style.cardBorderRadius, { flex: 1, flexDirection: 'row' }]}>
                        <View style={[Style.cardBorderRadiusLeft, { flex: 1, backgroundColor: 'red' }]}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 20 }}>
                                <MaterialIcons name={'delete'} size={24} />
                                <Text>Delete</Text>
                            </View>
                        </View>
                        <TouchableRipple style={[Style.cardBorderRadiusRight, { width: 80, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }]} onPress={() => console.log('reroll')}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <MaterialIcons name={'shuffle'} size={24} />
                                <Text>Reroll</Text>
                            </View>
                        </TouchableRipple>
                    </View>
                    <Card style={[Style.raceCard, Style.cardBorderRadiusLeft, Style.cardBorderRadiusRight]}>
                        <Card.Title title={this.props.race.name} subtitle={this.props.playerName}
                            left={
                                (props) => (
                                    <Image
                                        source={this.props.race.icon}
                                        style={{ resizeMode: 'contain', backgroundColor: 'transparent', height: 36, width: 36 }} />
                                )
                            }
                            right={(props) => this.props.isSpeaker ? <Chip style={{ marginHorizonta: 5, marginRight: 10 }} icon={'public'}>Speaker</Chip> : null}
                        />
                        <Card.Content>
                        </Card.Content>
                    </Card>
                </SwipeRow>
            </Animated.View>
        );
    };
}

export default RaceCard;