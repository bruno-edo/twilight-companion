import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { FlatList } from 'react-native';

import { RaceCard } from './components/presentation';
import { Race } from '../entities';

class RaceSelectionScreen extends Component {
    static propTypes = {
    
    }

    getRandomRace = () => races.splice(Math.floor(Math.random() * races.length), 1);
    getRaceCard = (playerName) => (<RaceCard playerName={playerName.item} race={this.getRandomRace()[0]} />)


    render() {
        return (
            <FlatList
            data={['player 1', 'player 2']}
            renderItem={this.getRaceCard}
            keyExtractor={(item, index) => `${index}`} />
        );
    };
}

const races = [
    'Universities of Jol-Nar',
    'Emirates of Hacan',
    'Federation of Sol',
    'Nekro Virus',
    'Brotherhood of Yin',
    'Sardak Norr',
    'L1z1x Mindnet',
    'Clan of Saar',
    'Ghosts of Creuss',
    'Barony of Letnev',
    'Yssrail Tribes',
    'Nalu Collective',
    'Mentak Coalition',
    'Xxcha Kingdoms',
    'Arborec',
    'Winnu',
    'Embers of Mua',
].map(name => new Race(name, require('../../assets/races/hacan.png')));

export default RaceSelectionScreen;