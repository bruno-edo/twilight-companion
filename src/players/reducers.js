import { createReducer } from 'reduxsauce';

import { Types } from './Actions';
import { Race } from '../entities'

export const INITIAL_STATE = {
    racePool: [
        new Race('Universities of Jol-Nar', require('../../assets/races/jolnar.png')),
        new Race('Emirates of Hacan', require('../../assets/races/hacan.png')),
        new Race('Federation of Sol', require('../../assets/races/sol.png')),
        new Race('Nekro Virus', require('../../assets/races/necro.png')),
        new Race('Brotherhood of Yin', require('../../assets/races/yin.png')),
        new Race('Sardak Norr', require('../../assets/races/sardakknorr.png')),
        new Race('L1z1x Mindnet', require('../../assets/races/lizix.png')),
        new Race('Clan of Saar', require('../../assets/races/saar.png')),
        new Race('Ghosts of Creuss', require('../../assets/races/creuss.png')),
        new Race('Barony of Letnev', require('../../assets/races/letnev.png')),
        new Race('Yssrail Tribes', require('../../assets/races/yssaril.png')),
        new Race('Naalu Collective', require('../../assets/races/naalu.png')),
        new Race('Mentak Coalition', require('../../assets/races/mentak.png')),
        new Race('Xxcha Kingdoms', require('../../assets/races/xxcha.png')),
        new Race('Arborec', require('../../assets/races/arborec.png')),
        new Race('Winnu', require('../../assets/races/winnu.png')),
        new Race('Embers of Muaat', require('../../assets/races/muaat.png')),
    ],
    players: [],
    currentId: 0,
};

export const getRandomArrayIndex = (array) => Math.floor(Math.random() * array.length);
export const getRandomRace = racePool => racePool.splice(getRandomArrayIndex(racePool), 1)[0];

/*
    TODO: add id generation for each player
*/
export const addPlayer = (state, { name }) => {
    const racePool = state.racePool.slice();
    const race = getRandomRace(racePool);
    const id = state.currentId + 1;
    const player = { name, race, isSpeaker: false, id };

    return ({
        ...state,
        racePool,
        players: [
            ...state.players,
            player,
        ],
        currentId: id,
    });
};

export const removePlayer = (state, { id }) => {
    const index = state.players.findIndex(player => player.id === id);

    if (index < 0) {
        return state;
    } else {
        const { race, isSpeaker } = state.players[index];
        const players = state.players.slice();
        players.splice(index, 1);

        if(isSpeaker && players.length > 0) {
            const speakerIndex = getRandomArrayIndex(players);
            players[speakerIndex].isSpeaker = true;
        }

        return ({
            ...state,
            players: [ ...players ],
            racePool: [
                ...state.racePool,
                race,
            ]
        });
    }
};

export const setSpeaker = (state) => {
    const speakerIndex = getRandomArrayIndex(state.players);

    return ({
        ...state,
        players: state.players.map((player, index) => {
            if(index === speakerIndex) {
                return ({
                    ...player,
                    isSpeaker: true,
                });
            } else {
                return player;
            }
        }),
    });
};

export const rerollRace = (state, { id }) => {
    const playerIndex = state.players.findIndex(player => player.id === id);
    const selectedPlayer = state.players[playerIndex];
    const { race: oldRace } = selectedPlayer;
    const racePool = state.racePool.slice();
    const newRace = getRandomRace(racePool);
    racePool.push(oldRace);

    return ({
        ...state,
        players: state.players.map((player, index) => {
            if (index === playerIndex) {
                return ({
                    ...player,
                    race: newRace,
                });
            } else {
                return player;
            }
        }),
        racePool,
    })

}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_PLAYER]: addPlayer,
    [Types.REMOVE_PLAYER]: removePlayer,
    [Types.SET_SPEAKER]: setSpeaker,
    [Types.REROLL_RACE]: rerollRace,
});
