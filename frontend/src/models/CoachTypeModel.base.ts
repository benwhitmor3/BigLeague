/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { CoachAttributeOneEnumType } from "./CoachAttributeOneEnum"
import { CoachAttributeTwoEnumType } from "./CoachAttributeTwoEnum"
import { StaffTypeModel, StaffTypeModelType } from "./StaffTypeModel"
import { StaffTypeModelSelector } from "./StaffTypeModel.base"
import { RootStoreType } from "./index"


/**
 * CoachTypeBase
 * auto generated base class for the model CoachTypeModel.
 */
export const CoachTypeModelBase = ModelBase
  .named('CoachType')
  .props({
    __typename: types.optional(types.literal("CoachType"), "CoachType"),
    name: types.union(types.undefined, types.string),
    attributeOne: types.union(types.undefined, CoachAttributeOneEnumType),
    attributeTwo: types.union(types.undefined, CoachAttributeTwoEnumType),
    staff: types.union(types.undefined, types.null, types.late((): any => StaffTypeModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class CoachTypeModelSelector extends QueryBuilder {
  get name() { return this.__attr(`name`) }
  get attributeOne() { return this.__attr(`attributeOne`) }
  get attributeTwo() { return this.__attr(`attributeTwo`) }
  staff(builder?: string | StaffTypeModelSelector | ((selector: StaffTypeModelSelector) => StaffTypeModelSelector)) { return this.__child(`staff`, StaffTypeModelSelector, builder) }
}
export function selectFromCoachType() {
  return new CoachTypeModelSelector()
}

export const coachTypeModelPrimitives = selectFromCoachType().name.attributeOne.attributeTwo
