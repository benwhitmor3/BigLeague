/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { CoachAttributeOneEnumType } from "./CoachAttributeOneEnum"
import { CoachAttributeTwoEnumType } from "./CoachAttributeTwoEnum"
import { FranchiseTypeModel, FranchiseTypeModelType } from "./FranchiseTypeModel"
import { FranchiseTypeModelSelector } from "./FranchiseTypeModel.base"
import { LeagueTypeModel, LeagueTypeModelType } from "./LeagueTypeModel"
import { LeagueTypeModelSelector } from "./LeagueTypeModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  league: LeagueTypeModelType;
  franchise: FranchiseTypeModelType;
}

/**
 * CoachTypeBase
 * auto generated base class for the model CoachTypeModel.
 */
export const CoachTypeModelBase = withTypedRefs<Refs>()(ModelBase
  .named('CoachType')
  .props({
    __typename: types.optional(types.literal("CoachType"), "CoachType"),
    id: types.identifier,
    name: types.union(types.undefined, types.string),
    attributeOne: types.union(types.undefined, CoachAttributeOneEnumType),
    attributeTwo: types.union(types.undefined, CoachAttributeTwoEnumType),
    league: types.union(types.undefined, MSTGQLRef(types.late((): any => LeagueTypeModel))),
    franchise: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => FranchiseTypeModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class CoachTypeModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get attributeOne() { return this.__attr(`attributeOne`) }
  get attributeTwo() { return this.__attr(`attributeTwo`) }
  league(builder?: string | LeagueTypeModelSelector | ((selector: LeagueTypeModelSelector) => LeagueTypeModelSelector)) { return this.__child(`league`, LeagueTypeModelSelector, builder) }
  franchise(builder?: string | FranchiseTypeModelSelector | ((selector: FranchiseTypeModelSelector) => FranchiseTypeModelSelector)) { return this.__child(`franchise`, FranchiseTypeModelSelector, builder) }
}
export function selectFromCoachType() {
  return new CoachTypeModelSelector()
}

export const coachTypeModelPrimitives = selectFromCoachType().name.attributeOne.attributeTwo
