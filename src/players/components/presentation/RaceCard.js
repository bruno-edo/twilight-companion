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
        playerName: PropTypes.string.isRequired,
        isSpeaker: PropTypes.bool.isRequired,
        callbackRemovePlayer: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.cardAnimatedValue = new Animated.Value(1);
        this.animationIsRunning = false;
    }

    rerollButtonPress = () => {
        this.swipeRowRef.closeRow();
    }

    onSwipeValueChange = (swipeData) => {
        const { key, value } = swipeData;
        // 375 or however large your screen is (i.e. Dimensions.get('window').width)
        if (value > 225 && !this.animationIsRunning) {
            this.animationIsRunning = true;
            Animated.timing(this.cardAnimatedValue, { toValue: 0, duration: 250 }).start(() => {
                this.animationIsRunning = false;
                this.props.callbackRemovePlayer(this.props.playerName);
            });
        }
    }

    render() {
        return (
            <Animated.View style={{
                opacity: this.cardAnimatedValue, transform: [{
                    scaleY: this.cardAnimatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1]
                    })
                }]
            }}>
                <SwipeRow rightOpenValue={-75} stopLeftSwipe={250} stopRightSwipe={-75} ref={ref => this.swipeRowRef = ref} onSwipeValueChange={this.onSwipeValueChange}>
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