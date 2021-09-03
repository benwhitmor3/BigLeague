/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { CityTypeModel, CityTypeModelType } from "./CityTypeModel"
import { CityTypeModelSelector } from "./CityTypeModel.base"
import { CoachTypeModel, CoachTypeModelType } from "./CoachTypeModel"
import { CoachTypeModelSelector } from "./CoachTypeModel.base"
import { FranchiseTypeModel, FranchiseTypeModelType } from "./FranchiseTypeModel"
import { FranchiseTypeModelSelector } from "./FranchiseTypeModel.base"
import { GmTypeModel, GmTypeModelType } from "./GmTypeModel"
import { GmTypeModelSelector } from "./GmTypeModel.base"
import { PlayerHistoryTypeModel, PlayerHistoryTypeModelType } from "./PlayerHistoryTypeModel"
import { PlayerHistoryTypeModelSelector } from "./PlayerHistoryTypeModel.base"
import { PlayerTypeModel, PlayerTypeModelType } from "./PlayerTypeModel"
import { PlayerTypeModelSelector } from "./PlayerTypeModel.base"
import { UserTypeModel, UserTypeModelType } from "./UserTypeModel"
import { UserTypeModelSelector } from "./UserTypeModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  user: UserTypeModelType;
  franchiseSet: IObservableArray<FranchiseTypeModelType>;
  citySet: IObservableArray<CityTypeModelType>;
  gmSet: IObservableArray<GmTypeModelType>;
  coachSet: IObservableArray<CoachTypeModelType>;
  playerSet: IObservableArray<PlayerTypeModelType>;
  playerhistorySet: IObservableArray<PlayerHistoryTypeModelType>;
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
    user: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => UserTypeModel))),
    franchiseSet: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => FranchiseTypeModel)))),
    citySet: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => CityTypeModel)))),
    gmSet: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => GmTypeModel)))),
    coachSet: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => CoachTypeModel)))),
    playerSet: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => PlayerTypeModel)))),
    playerhistorySet: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => PlayerHistoryTypeModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class LeagueTypeModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get leagueName() { return this.__attr(`leagueName`) }
  user(builder?: string | UserTypeModelSelector | ((selector: UserTypeModelSelector) => UserTypeModelSelector)) { return this.__child(`user`, UserTypeModelSelector, builder) }
  franchiseSet(builder?: string | FranchiseTypeModelSelector | ((selector: FranchiseTypeModelSelector) => FranchiseTypeModelSelector)) { return this.__child(`franchiseSet`, FranchiseTypeModelSelector, builder) }
  citySet(builder?: string | CityTypeModelSelector | ((selector: CityTypeModelSelector) => CityTypeModelSelector)) { return this.__child(`citySet`, CityTypeModelSelector, builder) }
  gmSet(builder?: string | GmTypeModelSelector | ((selector: GmTypeModelSelector) => GmTypeModelSelector)) { return this.__child(`gmSet`, GmTypeModelSelector, builder) }
  coachSet(builder?: string | CoachTypeModelSelector | ((selector: CoachTypeModelSelector) => CoachTypeModelSelector)) { return this.__child(`coachSet`, CoachTypeModelSelector, builder) }
  playerSet(builder?: string | PlayerTypeModelSelector | ((selector: PlayerTypeModelSelector) => PlayerTypeModelSelector)) { return this.__child(`playerSet`, PlayerTypeModelSelector, builder) }
  playerhistorySet(builder?: string | PlayerHistoryTypeModelSelector | ((selector: PlayerHistoryTypeModelSelector) => PlayerHistoryTypeModelSelector)) { return this.__child(`playerhistorySet`, PlayerHistoryTypeModelSelector, builder) }
}
export function selectFromLeagueType() {
  return new LeagueTypeModelSelector()
}

export const leagueTypeModelPrimitives = selectFromLeagueType().leagueName
