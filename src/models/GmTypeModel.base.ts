/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { FranchiseTypeModel, FranchiseTypeModelType } from "./FranchiseTypeModel"
import { FranchiseTypeModelSelector } from "./FranchiseTypeModel.base"
import { GmTraitEnumType } from "./GmTraitEnum"
import { LeagueTypeModel, LeagueTypeModelType } from "./LeagueTypeModel"
import { LeagueTypeModelSelector } from "./LeagueTypeModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  league: LeagueTypeModelType;
  franchiseSet: IObservableArray<FranchiseTypeModelType>;
}

/**
 * GmTypeBase
 * auto generated base class for the model GmTypeModel.
 */
export const GmTypeModelBase = withTypedRefs<Refs>()(ModelBase
  .named('GmType')
  .props({
    __typename: types.optional(types.literal("GMType"), "GMType"),
    id: types.identifier,
    trait: types.union(types.undefined, GmTraitEnumType),
    league: types.union(types.undefined, MSTGQLRef(types.late((): any => LeagueTypeModel))),
    franchiseSet: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => FranchiseTypeModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class GmTypeModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get trait() { return this.__attr(`trait`) }
  league(builder?: string | LeagueTypeModelSelector | ((selector: LeagueTypeModelSelector) => LeagueTypeModelSelector)) { return this.__child(`league`, LeagueTypeModelSelector, builder) }
  franchiseSet(builder?: string | FranchiseTypeModelSelector | ((selector: FranchiseTypeModelSelector) => FranchiseTypeModelSelector)) { return this.__child(`franchiseSet`, FranchiseTypeModelSelector, builder) }
}
export function selectFromGmType() {
  return new GmTypeModelSelector()
}

export const gmTypeModelPrimitives = selectFromGmType().trait
