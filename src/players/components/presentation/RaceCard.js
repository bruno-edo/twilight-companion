import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { Image, View, Text, Animated, Easing } from 'react-native';
import { Card, Chip, TouchableRipple } from 'react-native-paper';
import { SwipeRow } from 'react-native-swipe-list-view';

import Style from '../../style';

import { GeneralStyles } from '../../../Utils';

class RaceCard extends Component {
    static propTypes = {
        race: PropTypes.object,
        id: PropTypes.number.isRequired,
        playerName: PropTypes.string.isRequired,
        isSpeaker: PropTypes.bool.isRequired,
        callbackRemovePlayer: PropTypes.func.isRequired,
        callbackReroll: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.animationIsRunning = false;
        this.heightAnimation = new Animated.Value();
    }

    rerollButtonPress = () => {
        this.props.callbackReroll(this.props.id);
        this.swipeRowRef.closeRow();
    }

    onSwipeValueChange = (swipeData) => {
        const { value, isOpen, direction } = swipeData;

        if (direction === 'left' && !isOpen) {
            console.log('left is open');
        }

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
            <Animated.View
            onLayout={(event) => {
                this.maxHeight = event.nativeEvent.layout.height;
            }}
            style={{ height: this.heightAnimation }}>
                <SwipeRow
                rightOpenValue={-75}
                stopLeftSwipe={250}
                stopRightSwipe={-75}
                ref={ref => this.swipeRowRef = ref}
                onSwipeValueChange={this.onSwipeValueChange}>

                    <View style={[Style.raceCardUnderlay, Style.cardBorderRadius, GeneralStyles.containerRow]}>

                        <View style={[Style.cardBorderRadiusLeft, GeneralStyles.container, { backgroundColor: 'red' }]}>
                            <View style={[GeneralStyles.container, Style.deleteContainer]}>
                                <MaterialIcons name={'delete'} size={24} />
                                <Text>Delete</Text>
                            </View>
                        </View>

                        <TouchableRipple
                        style={[Style.cardBorderRadiusRight, GeneralStyles.centerContentHorVert, { width: 80 }]}
                        onPress={this.rerollButtonPress}>
                            <View style={[GeneralStyles.container, GeneralStyles.centerContentHorVert]}>
                                <MaterialIcons name={'shuffle'} size={24} />
                                <Text>Reroll</Text>
                            </View>
                        </TouchableRipple>

                    </View>

                    <Card
                    onPress={() => console.log('Card pressed')}
                    style={[Style.raceCard, Style.cardBorderRadiusLeft, Style.cardBorderRadiusRight]}>
                        <Card.Title
                        title={this.props.race.name}
                        subtitle={this.props.playerName}
                        left={
                            (props) => (
                                <Image
                                source={this.props.race.icon}
                                style={Style.raceIcon} />
                            )
                        }
                        right={(props) => this.props.isSpeaker ? <Chip style={Style.speakerChip} icon={'public'}>Speaker</Chip> : null} />
                        <Card.Content>
                            {/*
                                TODO add:
                                - race powers and fleet information;
                                - accordion animation to card
                            */}
                        </Card.Content>
                    </Card>

                </SwipeRow>
            </Animated.View>
        );
    };
}

export default RaceCard;