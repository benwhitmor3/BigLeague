import React from 'react';
import 'antd/dist/antd.css';
import {notification} from 'antd';
import {FranchiseTypeModelType} from "../../models";


export const rosterError = (franchise: string | undefined) => {
    notification.error({
        message: 'Roster Error',
        description: franchise + ' does not have enough players',
        duration: 10,
    });
};

export const lineupError = (franchise: string | undefined) => {
    notification.error({
        message: 'Lineup Error',
        description: franchise + ' has players with no lineup assigned',
        duration: 10,
    });
};

export const unsignedError = (franchise: string | undefined) => {
    notification.error({
        message: 'Unsigned Error',
        description: franchise + ' has unsigned players',
        duration: 10,
    });
};

export const starterError = (franchise: string | undefined) => {
    notification.error({
        message: 'Starter Error',
        description: franchise + ' does not have 5 starters',
        duration: 10,
    });
};

export const staffError = (franchise: string | undefined) => {
    notification.error({
        message: 'Staff Error',
        description: franchise + ' is not fully staffed',
        duration: 10,
    });
};


export const simSeasonChecker = (franchise: FranchiseTypeModelType) => {
    // every team needs at least 5 players
    if (franchise.playerSet.length < 5)
        return rosterError(franchise.franchise);
    // all players with a franchise need a lineup
    if (franchise.lineup.includes(null))
        return lineupError(franchise.franchise);
    // each franchise needs 5 starters
    if (franchise.starters.length !== 5)
        return starterError(franchise.franchise);
    // all players with a franchise need to be signed
    if (franchise.contracts.includes(null))
        return unsignedError(franchise.franchise);
    // all franchises need staff
    if (!franchise.gm || !franchise.coach)
        return staffError(franchise.franchise);
    }