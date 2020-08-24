/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum GmTrait {
  FACILITATOR="FACILITATOR",
PROMOTER="PROMOTER",
RECRUITER="RECRUITER",
SCOUTER="SCOUTER",
SUITOR="SUITOR",
TRAINER="TRAINER"
}

/**
* GmTrait
 *
 * An enumeration.
*/
export const GmTraitEnumType = types.enumeration("GmTrait", [
        "FACILITATOR", // facilitator
  "PROMOTER", // promoter
  "RECRUITER", // recruiter
  "SCOUTER", // scouter
  "SUITOR", // suitor
  "TRAINER", // trainer
      ])
