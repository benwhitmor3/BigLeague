import {notification} from "antd";


export const actionError = (franchise: string | undefined) => {
    notification.error({
        message: 'Action Error',
        description: franchise + ' does not have enough actions',
        duration: 10,
    });
};

export const ticketError = (franchise: string | undefined) => {
    notification.error({
        message: 'Ticket Error',
        description: franchise + ' do not have prices set',
        duration: 10,
    });
};

export const unusedActionError = (franchise: string | undefined) => {
    notification.error({
        message: 'Unused Actions Error',
        description: franchise + ' still have actions available',
        duration: 10,
    });
};

export const rosterError = (franchise: string | undefined) => {
    notification.error({
        message: 'Roster Error',
        description: franchise + ' do not have enough players',
        duration: 10,
    });
};

export const lineupError = (franchise: string | undefined) => {
    notification.error({
        message: 'Lineup Error',
        description: franchise + ' have players with no lineup assigned',
        duration: 10,
    });
};

export const unsignedError = (franchise: string | undefined) => {
    notification.error({
        message: 'Unsigned Error',
        description: franchise + ' have unsigned players',
        duration: 10,
    });
};

export const starterError = (franchise: string | undefined) => {
    notification.error({
        message: 'Starter Error',
        description: franchise + ' do not have 5 starters',
        duration: 10,
    });
};

export const staffError = (franchise: string | undefined) => {
    notification.error({
        message: 'Staff Error',
        description: franchise + ' are not fully staffed',
        duration: 10,
    });
};