import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { View, Image } from 'react-native';
import { Card, Paragraph, Subheading, Button, IconButton   } from 'react-native-paper';

import Style from '../../style';

class RaceCard extends Component {
    static propTypes = {
        race: PropTypes.object,
        playerName: PropTypes.string.isRequired,
    }

    render() {
        return (
            <Card style={Style.raceCard}>
                <Card.Title title={this.props.race.name} subtitle={this.props.playerName}
                left={
                    (props) => (
                        <Image
                        source={this.props.race.icon}
                        style={{ resizeMode: 'contain', backgroundColor: 'transparent', height: 36, width: 36 }} />
                    )
                }
                right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
                />
                {/* <Card.Content style={{ flexDirection: 'row' }}>
                    <Image source={this.props.race.icon} style={{ resizeMode: 'contain', backgroundColor: 'transparent', height: 48, width: 48 }} />
                    <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 10 }}>
                        <Subheading>{this.props.playerName}</Subheading>
                        <Paragraph>{ this.props.race.name }</Paragraph>
                    </View>
                </Card.Content>
                <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions> */}
            </Card>
        );
    };
}

export default RaceCard;