/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { GmTraitEnumType } from "./GmTraitEnum"
import { StaffTypeModel, StaffTypeModelType } from "./StaffTypeModel"
import { StaffTypeModelSelector } from "./StaffTypeModel.base"
import { RootStoreType } from "./index"


/**
 * GmTypeBase
 * auto generated base class for the model GmTypeModel.
 */
export const GmTypeModelBase = ModelBase
  .named('GmType')
  .props({
    __typename: types.optional(types.literal("GMType"), "GMType"),
    trait: types.union(types.undefined, GmTraitEnumType),
    staffSet: types.union(types.undefined, types.array(types.late((): any => StaffTypeModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class GmTypeModelSelector extends QueryBuilder {
  get trait() { return this.__attr(`trait`) }
  staffSet(builder?: string | StaffTypeModelSelector | ((selector: StaffTypeModelSelector) => StaffTypeModelSelector)) { return this.__child(`staffSet`, StaffTypeModelSelector, builder) }
}
export function selectFromGmType() {
  return new GmTypeModelSelector()
}

export const gmTypeModelPrimitives = selectFromGmType().trait
