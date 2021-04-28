/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ActionTypeModel, ActionTypeModelType } from "./ActionTypeModel"
import { ActionTypeModelSelector } from "./ActionTypeModel.base"
import { CoachTypeModel, CoachTypeModelType } from "./CoachTypeModel"
import { CoachTypeModelSelector } from "./CoachTypeModel.base"
import { GmTypeModel, GmTypeModelType } from "./GmTypeModel"
import { GmTypeModelSelector } from "./GmTypeModel.base"
import { LeagueTypeModel, LeagueTypeModelType } from "./LeagueTypeModel"
import { LeagueTypeModelSelector } from "./LeagueTypeModel.base"
import { PlayerTypeModel, PlayerTypeModelType } from "./PlayerTypeModel"
import { PlayerTypeModelSelector } from "./PlayerTypeModel.base"
import { RosterTypeModel, RosterTypeModelType } from "./RosterTypeModel"
import { RosterTypeModelSelector } from "./RosterTypeModel.base"
import { SeasonTypeModel, SeasonTypeModelType } from "./SeasonTypeModel"
import { SeasonTypeModelSelector } from "./SeasonTypeModel.base"
import { StadiumTypeModel, StadiumTypeModelType } from "./StadiumTypeModel"
import { StadiumTypeModelSelector } from "./StadiumTypeModel.base"
import { UserTypeModel, UserTypeModelType } from "./UserTypeModel"
import { UserTypeModelSelector } from "./UserTypeModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  user: UserTypeModelType;
  league: LeagueTypeModelType;
  gm: GmTypeModelType;
  coach: CoachTypeModelType;
  stadium: StadiumTypeModelType;
  player: PlayerTypeModelType;
  action: ActionTypeModelType;
  seasonSet: IObservableArray<SeasonTypeModelType>;
  rosterSet: IObservableArray<RosterTypeModelType>;
}

/**
 * FranchiseTypeBase
 * auto generated base class for the model FranchiseTypeModel.
 */
export const FranchiseTypeModelBase = withTypedRefs<Refs>()(ModelBase
  .named('FranchiseType')
  .props({
    __typename: types.optional(types.literal("FranchiseType"), "FranchiseType"),
    id: types.identifier,
    franchise: types.union(types.undefined, types.string),
    user: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => UserTypeModel))),
    league: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => LeagueTypeModel))),
    gm: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => GmTypeModel))),
    coach: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => CoachTypeModel))),
    stadium: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => StadiumTypeModel))),
    player: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => PlayerTypeModel))),
    action: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => ActionTypeModel))),
    seasonSet: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => SeasonTypeModel)))),
    rosterSet: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => RosterTypeModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class FranchiseTypeModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get franchise() { return this.__attr(`franchise`) }
  user(builder?: string | UserTypeModelSelector | ((selector: UserTypeModelSelector) => UserTypeModelSelector)) { return this.__child(`user`, UserTypeModelSelector, builder) }
  league(builder?: string | LeagueTypeModelSelector | ((selector: LeagueTypeModelSelector) => LeagueTypeModelSelector)) { return this.__child(`league`, LeagueTypeModelSelector, builder) }
  gm(builder?: string | GmTypeModelSelector | ((selector: GmTypeModelSelector) => GmTypeModelSelector)) { return this.__child(`gm`, GmTypeModelSelector, builder) }
  coach(builder?: string | CoachTypeModelSelector | ((selector: CoachTypeModelSelector) => CoachTypeModelSelector)) { return this.__child(`coach`, CoachTypeModelSelector, builder) }
  stadium(builder?: string | StadiumTypeModelSelector | ((selector: StadiumTypeModelSelector) => StadiumTypeModelSelector)) { return this.__child(`stadium`, StadiumTypeModelSelector, builder) }
  player(builder?: string | PlayerTypeModelSelector | ((selector: PlayerTypeModelSelector) => PlayerTypeModelSelector)) { return this.__child(`player`, PlayerTypeModelSelector, builder) }
  action(builder?: string | ActionTypeModelSelector | ((selector: ActionTypeModelSelector) => ActionTypeModelSelector)) { return this.__child(`action`, ActionTypeModelSelector, builder) }
  seasonSet(builder?: string | SeasonTypeModelSelector | ((selector: SeasonTypeModelSelector) => SeasonTypeModelSelector)) { return this.__child(`seasonSet`, SeasonTypeModelSelector, builder) }
  rosterSet(builder?: string | RosterTypeModelSelector | ((selector: RosterTypeModelSelector) => RosterTypeModelSelector)) { return this.__child(`rosterSet`, RosterTypeModelSelector, builder) }
}
export function selectFromFranchiseType() {
  return new FranchiseTypeModelSelector()
}

export const franchiseTypeModelPrimitives = selectFromFranchiseType().franchise
