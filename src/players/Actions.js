import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
    addPlayer: ['name'],
    removePlayer: ['id'],
    setSpeaker: null,
});
