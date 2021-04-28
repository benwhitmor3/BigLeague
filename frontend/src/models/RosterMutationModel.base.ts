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
 * RosterMutationBase
 * auto generated base class for the model RosterMutationModel.
 */
export const RosterMutationModelBase = withTypedRefs<Refs>()(ModelBase
  .named('RosterMutation')
  .props({
    __typename: types.optional(types.literal("RosterMutation"), "RosterMutation"),
    roster: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => RosterTypeModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class RosterMutationModelSelector extends QueryBuilder {
  roster(builder?: string | RosterTypeModelSelector | ((selector: RosterTypeModelSelector) => RosterTypeModelSelector)) { return this.__child(`roster`, RosterTypeModelSelector, builder) }
}
export function selectFromRosterMutation() {
  return new RosterMutationModelSelector()
}

export const rosterMutationModelPrimitives = selectFromRosterMutation()
