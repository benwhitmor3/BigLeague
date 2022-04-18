/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RosterTypeModel, RosterTypeModelType } from "./RosterTypeModel"
import { RosterTypeModelSelector } from "./RosterTypeModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  roster: RosterTypeModelType;
}

/**
 * UpdateRosterMutationBase
 * auto generated base class for the model UpdateRosterMutationModel.
 */
export const UpdateRosterMutationModelBase = withTypedRefs<Refs>()(ModelBase
  .named('UpdateRosterMutation')
  .props({
    __typename: types.optional(types.literal("UpdateRosterMutation"), "UpdateRosterMutation"),
    roster: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => RosterTypeModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class UpdateRosterMutationModelSelector extends QueryBuilder {
  roster(builder?: string | RosterTypeModelSelector | ((selector: RosterTypeModelSelector) => RosterTypeModelSelector)) { return this.__child(`roster`, RosterTypeModelSelector, builder) }
}
export function selectFromUpdateRosterMutation() {
  return new UpdateRosterMutationModelSelector()
}

export const updateRosterMutationModelPrimitives = selectFromUpdateRosterMutation()
