/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RosterTypeModel, RosterTypeModelType } from "./RosterTypeModel"
import { RosterTypeModelSelector } from "./RosterTypeModel.base"
import { RootStoreType } from "./index"


/**
 * RosterMutationBase
 * auto generated base class for the model RosterMutationModel.
 */
export const RosterMutationModelBase = ModelBase
  .named('RosterMutation')
  .props({
    __typename: types.optional(types.literal("RosterMutation"), "RosterMutation"),
    roster: types.union(types.undefined, types.null, types.late((): any => RosterTypeModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class RosterMutationModelSelector extends QueryBuilder {
  roster(builder?: string | RosterTypeModelSelector | ((selector: RosterTypeModelSelector) => RosterTypeModelSelector)) { return this.__child(`roster`, RosterTypeModelSelector, builder) }
}
export function selectFromRosterMutation() {
  return new RosterMutationModelSelector()
}

export const rosterMutationModelPrimitives = selectFromRosterMutation()
