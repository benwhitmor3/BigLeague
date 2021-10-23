/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { FranchiseTypeModel, FranchiseTypeModelType } from "./FranchiseTypeModel"
import { FranchiseTypeModelSelector } from "./FranchiseTypeModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  franchise: FranchiseTypeModelType;
}

/**
 * SeasonTypeBase
 * auto generated base class for the model SeasonTypeModel.
 */
export const SeasonTypeModelBase = withTypedRefs<Refs>()(ModelBase
  .named('SeasonType')
  .props({
    __typename: types.optional(types.literal("SeasonType"), "SeasonType"),
    id: types.identifier,
    franchise: types.union(types.undefined, MSTGQLRef(types.late((): any => FranchiseTypeModel))),
    season: types.union(types.undefined, types.integer),
    ready: types.union(types.undefined, types.boolean),
    wins: types.union(types.undefined, types.integer),
    losses: types.union(types.undefined, types.integer),
    ppg: types.union(types.undefined, types.number),
    std: types.union(types.undefined, types.number),
    championships: types.union(types.undefined, types.integer),
    bonuses: types.union(types.undefined, types.integer),
    penalties: types.union(types.undefined, types.integer),
    fanBase: types.union(types.undefined, types.number),
    fanIndex: types.union(types.undefined, types.number),
    advertising: types.union(types.undefined, types.integer),
    revenue: types.union(types.undefined, types.number),
    expenses: types.union(types.undefined, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class SeasonTypeModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get season() { return this.__attr(`season`) }
  get ready() { return this.__attr(`ready`) }
  get wins() { return this.__attr(`wins`) }
  get losses() { return this.__attr(`losses`) }
  get ppg() { return this.__attr(`ppg`) }
  get std() { return this.__attr(`std`) }
  get championships() { return this.__attr(`championships`) }
  get bonuses() { return this.__attr(`bonuses`) }
  get penalties() { return this.__attr(`penalties`) }
  get fanBase() { return this.__attr(`fanBase`) }
  get fanIndex() { return this.__attr(`fanIndex`) }
  get advertising() { return this.__attr(`advertising`) }
  get revenue() { return this.__attr(`revenue`) }
  get expenses() { return this.__attr(`expenses`) }
  franchise(builder?: string | FranchiseTypeModelSelector | ((selector: FranchiseTypeModelSelector) => FranchiseTypeModelSelector)) { return this.__child(`franchise`, FranchiseTypeModelSelector, builder) }
}
export function selectFromSeasonType() {
  return new SeasonTypeModelSelector()
}

export const seasonTypeModelPrimitives = selectFromSeasonType().season.ready.wins.losses.ppg.std.championships.bonuses.penalties.fanBase.fanIndex.advertising.revenue.expenses
