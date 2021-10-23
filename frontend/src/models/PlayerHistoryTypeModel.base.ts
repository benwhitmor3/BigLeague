/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { LeagueTypeModel, LeagueTypeModelType } from "./LeagueTypeModel"
import { LeagueTypeModelSelector } from "./LeagueTypeModel.base"
import { PlayerHistorySuitEnumType } from "./PlayerHistorySuitEnum"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  league: LeagueTypeModelType;
}

/**
 * PlayerHistoryTypeBase
 * auto generated base class for the model PlayerHistoryTypeModel.
 */
export const PlayerHistoryTypeModelBase = withTypedRefs<Refs>()(ModelBase
  .named('PlayerHistoryType')
  .props({
    __typename: types.optional(types.literal("PlayerHistoryType"), "PlayerHistoryType"),
    id: types.identifier,
    season: types.union(types.undefined, types.integer),
    name: types.union(types.undefined, types.string),
    suit: types.union(types.undefined, PlayerHistorySuitEnumType),
    age: types.union(types.undefined, types.integer),
    pv: types.union(types.undefined, types.number),
    epv: types.union(types.undefined, types.number),
    sEpv: types.union(types.undefined, types.number),
    league: types.union(types.undefined, MSTGQLRef(types.late((): any => LeagueTypeModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class PlayerHistoryTypeModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get season() { return this.__attr(`season`) }
  get name() { return this.__attr(`name`) }
  get suit() { return this.__attr(`suit`) }
  get age() { return this.__attr(`age`) }
  get pv() { return this.__attr(`pv`) }
  get epv() { return this.__attr(`epv`) }
  get sEpv() { return this.__attr(`sEpv`) }
  league(builder?: string | LeagueTypeModelSelector | ((selector: LeagueTypeModelSelector) => LeagueTypeModelSelector)) { return this.__child(`league`, LeagueTypeModelSelector, builder) }
}
export function selectFromPlayerHistoryType() {
  return new PlayerHistoryTypeModelSelector()
}

export const playerHistoryTypeModelPrimitives = selectFromPlayerHistoryType().season.name.suit.age.pv.epv.sEpv
