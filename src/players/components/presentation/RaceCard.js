import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { View, Image } from 'react-native';
import { Card, Paragraph, Avatar } from 'react-native-paper';

import Style from '../../style';

class RaceCard extends Component {
    static propTypes = {
        race: PropTypes.object,
        playerName: PropTypes.string.isRequired,
    }

    render() {
        return (
            <Card style={Style.raceCard}>
                <Card.Title title={this.props.playerName} titleStyle={{ fontSize: 14 }} />
                <Card.Content style={{ flexDirection: 'row' }}>
                    <Image source={this.props.race.icon} style={{ resizeMode: 'contain', backgroundColor: 'transparent', height: 48, width: 48 }} />
                    <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 10 }}>
                        <Paragraph>{ this.props.race.name }</Paragraph>
                    </View>
                </Card.Content>
            </Card>
        );
    };
}

export default RaceCard;