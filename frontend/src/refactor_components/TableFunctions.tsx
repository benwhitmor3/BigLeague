import React, {useContext} from "react";
import {PlayerTypeModelType, StoreContext} from "../models";


export const colour = (suit: string) => {
      if (suit === 'diamond') {
        return '#40a9ff';
      }
      else if (suit === 'spade') {
        return '#ffc53d';
      }
      else if (suit === 'heart') {
        return '#ff4d4f';
      }
      else if (suit === 'club') {
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