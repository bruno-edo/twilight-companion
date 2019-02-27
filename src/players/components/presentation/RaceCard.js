import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Image, View } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import { SwipeRow } from 'react-native-swipe-list-view';

import Style from '../../style';

class RaceCard extends Component {
    static propTypes = {
        race: PropTypes.object,
        playerName: PropTypes.string.isRequired,
    }

    render() {
        return (
            <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
                <View>

                </View>
                <Card style={Style.raceCard}>
                    <Card.Title title={this.props.race.name} subtitle={this.props.playerName}
                        left={
                            (props) => (
                                <Image
                                    source={this.props.race.icon}
                                    style={{ resizeMode: 'contain', backgroundColor: 'transparent', height: 36, width: 36 }} />
                            )
                        }
                        right={(props) => <Chip style={{ marginHorizonta: 5, marginRight: 10 }} icon={'public'}>Speaker</Chip>}
                    />
                    <Card.Content>
                    </Card.Content>
                </Card>
            </SwipeRow>
        );
    };
}

export default RaceCard;