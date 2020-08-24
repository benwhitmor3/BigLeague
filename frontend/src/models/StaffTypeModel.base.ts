/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { CoachTypeModel, CoachTypeModelType } from "./CoachTypeModel"
import { CoachTypeModelSelector } from "./CoachTypeModel.base"
import { FranchiseTypeModel, FranchiseTypeModelType } from "./FranchiseTypeModel"
import { FranchiseTypeModelSelector } from "./FranchiseTypeModel.base"
import { GmTypeModel, GmTypeModelType } from "./GmTypeModel"
import { GmTypeModelSelector } from "./GmTypeModel.base"
import { RootStoreType } from "./index"


/**
 * StaffTypeBase
 * auto generated base class for the model StaffTypeModel.
 */
export const StaffTypeModelBase = ModelBase
  .named('StaffType')
  .props({
    __typename: types.optional(types.literal("StaffType"), "StaffType"),
    franchise: types.union(types.undefined, types.late((): any => FranchiseTypeModel)),
    gm: types.union(types.undefined, types.null, types.late((): any => GmTypeModel)),
    coach: types.union(types.undefined, types.null, types.late((): any => CoachTypeModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class StaffTypeModelSelector extends QueryBuilder {
  franchise(builder?: string | FranchiseTypeModelSelector | ((selector: FranchiseTypeModelSelector) => FranchiseTypeModelSelector)) { return this.__child(`franchise`, FranchiseTypeModelSelector, builder) }
  gm(builder?: string | GmTypeModelSelector | ((selector: GmTypeModelSelector) => GmTypeModelSelector)) { return this.__child(`gm`, GmTypeModelSelector, builder) }
  coach(builder?: string | CoachTypeModelSelector | ((selector: CoachTypeModelSelector) => CoachTypeModelSelector)) { return this.__child(`coach`, CoachTypeModelSelector, builder) }
}
export function selectFromStaffType() {
  return new StaffTypeModelSelector()
}

export const staffTypeModelPrimitives = selectFromStaffType()
