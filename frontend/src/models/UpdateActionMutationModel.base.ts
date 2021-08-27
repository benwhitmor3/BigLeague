/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ActionTypeModel, ActionTypeModelType } from "./ActionTypeModel"
import { ActionTypeModelSelector } from "./ActionTypeModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  action: ActionTypeModelType;
}

/**
 * UpdateActionMutationBase
 * auto generated base class for the model UpdateActionMutationModel.
 */
export const UpdateActionMutationModelBase = withTypedRefs<Refs>()(ModelBase
  .named('UpdateActionMutation')
  .props({
    __typename: types.optional(types.literal("UpdateActionMutation"), "UpdateActionMutation"),
    action: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => ActionTypeModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class UpdateActionMutationModelSelector extends QueryBuilder {
  action(builder?: string | ActionTypeModelSelector | ((selector: ActionTypeModelSelector) => ActionTypeModelSelector)) { return this.__child(`action`, ActionTypeModelSelector, builder) }
}
export function selectFromUpdateActionMutation() {
  return new UpdateActionMutationModelSelector()
}

export const updateActionMutationModelPrimitives = selectFromUpdateActionMutation()
