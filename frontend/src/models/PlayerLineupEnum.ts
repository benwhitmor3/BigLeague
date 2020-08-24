/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum PlayerLineup {
  BENCH="BENCH",
ROTATION="ROTATION",
STARTER="STARTER"
}

/**
* PlayerLineup
 *
 * An enumeration.
*/
export const PlayerLineupEnumType = types.enumeration("PlayerLineup", [
        "BENCH", // bench
  "ROTATION", // rotation
  "STARTER", // starter
      ])
