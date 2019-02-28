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
};

export const getRandomArrayIndex = (array) => Math.floor(Math.random() * array.length);
export const getRandomRace = racePool => racePool.splice(getRandomArrayIndex(racePool), 1)[0];

export const addPlayer = (state, { name }) => {
    const pool = state.racePool.slice();
    const race = getRandomRace(pool);
    const player = { name, race, isSpeaker: false };
    return ({
        ...state,
        racePool: pool,
        players: [
            ...state.players,
            player,
        ]
    });
}

export const removePlayer = (state, { id }) => {
    /*
        TODO: If speaker is removed appoint new random speaker.
    */
    const index = state.players.findIndex(player => player.name === id);
    return ({
        ...state,
        players: [
            ...state.players.slice(0, index), ...state.players.slice(index + 1),
        ],
    });
}

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
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_PLAYER]: addPlayer,
    [Types.REMOVE_PLAYER]: removePlayer,
    [Types.SET_SPEAKER]: setSpeaker,
});
