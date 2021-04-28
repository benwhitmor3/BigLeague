/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { CoachTypeModel, CoachTypeModelType } from "./CoachTypeModel"
import { CoachTypeModelSelector } from "./CoachTypeModel.base"
import { FranchiseTypeModel, FranchiseTypeModelType } from "./FranchiseTypeModel"
import { FranchiseTypeModelSelector } from "./FranchiseTypeModel.base"
import { GmTypeModel, GmTypeModelType } from "./GmTypeModel"
import { GmTypeModelSelector } from "./GmTypeModel.base"
import { PlayerTypeModel, PlayerTypeModelType } from "./PlayerTypeModel"
import { PlayerTypeModelSelector } from "./PlayerTypeModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  franchiseSet: IObservableArray<FranchiseTypeModelType>;
  gmSet: IObservableArray<GmTypeModelType>;
  coachSet: IObservableArray<CoachTypeModelType>;
  playerSet: IObservableArray<PlayerTypeModelType>;
}

/**
 * LeagueTypeBase
 * auto generated base class for the model LeagueTypeModel.
 */
export const LeagueTypeModelBase = withTypedRefs<Refs>()(ModelBase
  .named('LeagueType')
  .props({
    __typename: types.optional(types.literal("LeagueType"), "LeagueType"),
    id: types.identifier,
    leagueName: types.union(types.undefined, types.string),
    franchiseSet: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => FranchiseTypeModel)))),
    gmSet: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => GmTypeModel)))),
    coachSet: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => CoachTypeModel)))),
    playerSet: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => PlayerTypeModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class LeagueTypeModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get leagueName() { return this.__attr(`leagueName`) }
  franchiseSet(builder?: string | FranchiseTypeModelSelector | ((selector: FranchiseTypeModelSelector) => FranchiseTypeModelSelector)) { return this.__child(`franchiseSet`, FranchiseTypeModelSelector, builder) }
  gmSet(builder?: string | GmTypeModelSelector | ((selector: GmTypeModelSelector) => GmTypeModelSelector)) { return this.__child(`gmSet`, GmTypeModelSelector, builder) }
  coachSet(builder?: string | CoachTypeModelSelector | ((selector: CoachTypeModelSelector) => CoachTypeModelSelector)) { return this.__child(`coachSet`, CoachTypeModelSelector, builder) }
  playerSet(builder?: string | PlayerTypeModelSelector | ((selector: PlayerTypeModelSelector) => PlayerTypeModelSelector)) { return this.__child(`playerSet`, PlayerTypeModelSelector, builder) }
}
export function selectFromLeagueType() {
  return new LeagueTypeModelSelector()
}

export const leagueTypeModelPrimitives = selectFromLeagueType().leagueName
