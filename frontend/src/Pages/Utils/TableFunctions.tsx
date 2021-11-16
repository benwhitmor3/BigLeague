import React from "react";
import {PlayerTypeModelType} from "../../models";

export const insertArray = ( array: any, index: number, item: any ) => {
    array.splice( index, 0, item );
};

export const colour = (suit: string) => {
      if (suit.toLowerCase() === 'diamond') {
        return '#40a9ff';
      }
      else if (suit.toLowerCase() === 'spade' ) {
        return '#ffc53d';
      }
      else if (suit.toLowerCase() === 'heart') {
        return '#ff4d4f';
      }
      else if (suit.toLowerCase() === 'club') {
        return '#73d13d';
      }
}

  export const suit_icon = (suit: string) => {
    if (suit === 'diamond') {
      return <span role="img" aria-label="diamond"> ♦ </span>;
    }
    else if (suit === 'spade') {
      return <span role="img" aria-label="spade"> ♠ </span>;
    }
    else if (suit === 'heart') {
      return <span role="img" aria-label="spade"> ♥ </span>;
    }
    else if (suit === 'club') {
      return <span role="img" aria-label="spade"> ♣ </span>;
    }
}

  export const _to_fixed = (value: any) => {
  if (value != null) {
    return value.toFixed(2) ;
  }
  else {
    return "";
  }
}

  export const draft = (player: PlayerTypeModelType) => {
    console.log(player)
  }

  export const _lineup = (lineup: any) => {
    if (lineup != null) {
      return lineup ;
    }
    else {
      return "";
    }
}