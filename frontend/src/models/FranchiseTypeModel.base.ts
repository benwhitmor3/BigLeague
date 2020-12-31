/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ActionTypeModel, ActionTypeModelType } from "./ActionTypeModel"
import { ActionTypeModelSelector } from "./ActionTypeModel.base"
import { LeagueTypeModel, LeagueTypeModelType } from "./LeagueTypeModel"
import { LeagueTypeModelSelector } from "./LeagueTypeModel.base"
import { RosterTypeModel, RosterTypeModelType } from "./RosterTypeModel"
import { RosterTypeModelSelector } from "./RosterTypeModel.base"
import { SeasonTypeModel, SeasonTypeModelType } from "./SeasonTypeModel"
import { SeasonTypeModelSelector } from "./SeasonTypeModel.base"
import { StadiumTypeModel, StadiumTypeModelType } from "./StadiumTypeModel"
import { StadiumTypeModelSelector } from "./StadiumTypeModel.base"
import { StaffTypeModel, StaffTypeModelType } from "./StaffTypeModel"
import { StaffTypeModelSelector } from "./StaffTypeModel.base"
import { UserTypeModel, UserTypeModelType } from "./UserTypeModel"
import { UserTypeModelSelector } from "./UserTypeModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  user: UserTypeModelType;
}

/**
 * FranchiseTypeBase
 * auto generated base class for the model FranchiseTypeModel.
 */
export const FranchiseTypeModelBase = withTypedRefs<Refs>()(ModelBase
  .named('FranchiseType')
  .props({
    __typename: types.optional(types.literal("FranchiseType"), "FranchiseType"),
    franchise: types.union(types.undefined, types.string),
    user: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => UserTypeModel))),
    leagueSet: types.union(types.undefined, types.array(types.late((): any => LeagueTypeModel))),
    stadium: types.union(types.undefined, types.null, types.late((): any => StadiumTypeModel)),
    action: types.union(types.undefined, types.null, types.late((): any => ActionTypeModel)),
    season: types.union(types.undefined, types.null, types.late((): any => SeasonTypeModel)),
    staff: types.union(types.undefined, types.null, types.late((): any => StaffTypeModel)),
    rosterSet: types.union(types.undefined, types.array(types.late((): any => RosterTypeModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class FranchiseTypeModelSelector extends QueryBuilder {
  get franchise() { return this.__attr(`franchise`) }
  user(builder?: string | UserTypeModelSelector | ((selector: UserTypeModelSelector) => UserTypeModelSelector)) { return this.__child(`user`, UserTypeModelSelector, builder) }
  leagueSet(builder?: string | LeagueTypeModelSelector | ((selector: LeagueTypeModelSelector) => LeagueTypeModelSelector)) { return this.__child(`leagueSet`, LeagueTypeModelSelector, builder) }
  stadium(builder?: string | StadiumTypeModelSelector | ((selector: StadiumTypeModelSelector) => StadiumTypeModelSelector)) { return this.__child(`stadium`, StadiumTypeModelSelector, builder) }
  action(builder?: string | ActionTypeModelSelector | ((selector: ActionTypeModelSelector) => ActionTypeModelSelector)) { return this.__child(`action`, ActionTypeModelSelector, builder) }
  season(builder?: string | SeasonTypeModelSelector | ((selector: SeasonTypeModelSelector) => SeasonTypeModelSelector)) { return this.__child(`season`, SeasonTypeModelSelector, builder) }
  staff(builder?: string | StaffTypeModelSelector | ((selector: StaffTypeModelSelector) => StaffTypeModelSelector)) { return this.__child(`staff`, StaffTypeModelSelector, builder) }
  rosterSet(builder?: string | RosterTypeModelSelector | ((selector: RosterTypeModelSelector) => RosterTypeModelSelector)) { return this.__child(`rosterSet`, RosterTypeModelSelector, builder) }
}
export function selectFromFranchiseType() {
  return new FranchiseTypeModelSelector()
}

export const franchiseTypeModelPrimitives = selectFromFranchiseType().franchise
