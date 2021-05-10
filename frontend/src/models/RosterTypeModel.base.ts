/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { FranchiseTypeModel, FranchiseTypeModelType } from "./FranchiseTypeModel"
import { FranchiseTypeModelSelector } from "./FranchiseTypeModel.base"
import { PlayerTypeModel, PlayerTypeModelType } from "./PlayerTypeModel"
import { PlayerTypeModelSelector } from "./PlayerTypeModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  player: PlayerTypeModelType;
  franchise: FranchiseTypeModelType;
}

/**
 * RosterTypeBase
 * auto generated base class for the model RosterTypeModel.
 */
export const RosterTypeModelBase = withTypedRefs<Refs>()(ModelBase
  .named('RosterType')
  .props({
    __typename: types.optional(types.literal("RosterType"), "RosterType"),
    id: types.identifier,
    player: types.union(types.undefined, MSTGQLRef(types.late((): any => PlayerTypeModel))),
    franchise: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => FranchiseTypeModel))),
    lineup: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class RosterTypeModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get lineup() { return this.__attr(`lineup`) }
  player(builder?: string | PlayerTypeModelSelector | ((selector: PlayerTypeModelSelector) => PlayerTypeModelSelector)) { return this.__child(`player`, PlayerTypeModelSelector, builder) }
  franchise(builder?: string | FranchiseTypeModelSelector | ((selector: FranchiseTypeModelSelector) => FranchiseTypeModelSelector)) { return this.__child(`franchise`, FranchiseTypeModelSelector, builder) }
}
export function selectFromRosterType() {
  return new RosterTypeModelSelector()
}

export const rosterTypeModelPrimitives = selectFromRosterType().lineup
