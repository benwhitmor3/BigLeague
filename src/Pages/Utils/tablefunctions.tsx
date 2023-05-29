import React from "react";

export const insertArray = (array: any, index: number, item: any) => {
    array.splice(index, 0, item);
};

export const colour = (suit: string) => {
    const lowerCaseSuit = suit.toLowerCase();
    if (lowerCaseSuit === 'diamond') {
        return '#40a9ff';
    } else if (lowerCaseSuit === 'spade') {
        return '#ffc53d';
    } else if (lowerCaseSuit === 'heart') {
        return '#ff4d4f';
    } else if (lowerCaseSuit === 'club') {
        return '#73d13d';
    }
}

export const suit_icon = (suit: string) => {
    if (suit === 'diamond') {
        return <span role="img" aria-label="diamond"> ♦ </span>;
    } else if (suit === 'spade') {
        return <span role="img" aria-label="spade"> ♠ </span>;
    } else if (suit === 'heart') {
        return <span role="img" aria-label="spade"> ♥ </span>;
    } else if (suit === 'club') {
        return <span role="img" aria-label="spade"> ♣ </span>;
    }
}

export const _to_fixed = (value: any) => {
    return value != null ? value.toFixed(2) : '';
}


export const _lineup = (lineup: any) => {
    return lineup != null ? lineup : '';
}
