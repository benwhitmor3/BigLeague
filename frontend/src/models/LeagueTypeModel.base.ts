/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { FranchiseTypeModel, FranchiseTypeModelType } from "./FranchiseTypeModel"
import { FranchiseTypeModelSelector } from "./FranchiseTypeModel.base"
import { RootStoreType } from "./index"


/**
 * LeagueTypeBase
 * auto generated base class for the model LeagueTypeModel.
 */
export const LeagueTypeModelBase = ModelBase
  .named('LeagueType')
  .props({
    __typename: types.optional(types.literal("LeagueType"), "LeagueType"),
    leagueName: types.union(types.undefined, types.string),
    franchise: types.union(types.undefined, types.null, types.late((): any => FranchiseTypeModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class LeagueTypeModelSelector extends QueryBuilder {
  get leagueName() { return this.__attr(`leagueName`) }
  franchise(builder?: string | FranchiseTypeModelSelector | ((selector: FranchiseTypeModelSelector) => FranchiseTypeModelSelector)) { return this.__child(`franchise`, FranchiseTypeModelSelector, builder) }
}
export function selectFromLeagueType() {
  return new LeagueTypeModelSelector()
}

export const leagueTypeModelPrimitives = selectFromLeagueType().leagueName