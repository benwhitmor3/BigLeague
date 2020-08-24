/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { FranchiseTypeModel, FranchiseTypeModelType } from "./FranchiseTypeModel"
import { FranchiseTypeModelSelector } from "./FranchiseTypeModel.base"
import { PlayerTypeModel, PlayerTypeModelType } from "./PlayerTypeModel"
import { PlayerTypeModelSelector } from "./PlayerTypeModel.base"
import { RootStoreType } from "./index"


/**
 * RosterTypeBase
 * auto generated base class for the model RosterTypeModel.
 */
export const RosterTypeModelBase = ModelBase
  .named('RosterType')
  .props({
    __typename: types.optional(types.literal("RosterType"), "RosterType"),
    player: types.union(types.undefined, types.late((): any => PlayerTypeModel)),
    franchise: types.union(types.undefined, types.late((): any => FranchiseTypeModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class RosterTypeModelSelector extends QueryBuilder {
  player(builder?: string | PlayerTypeModelSelector | ((selector: PlayerTypeModelSelector) => PlayerTypeModelSelector)) { return this.__child(`player`, PlayerTypeModelSelector, builder) }
  franchise(builder?: string | FranchiseTypeModelSelector | ((selector: FranchiseTypeModelSelector) => FranchiseTypeModelSelector)) { return this.__child(`franchise`, FranchiseTypeModelSelector, builder) }
}
export function selectFromRosterType() {
  return new RosterTypeModelSelector()
}

export const rosterTypeModelPrimitives = selectFromRosterType()
