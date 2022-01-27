/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * VerifyBase
 * auto generated base class for the model VerifyModel.
 */
export const VerifyModelBase = ModelBase
  .named('Verify')
  .props({
    __typename: types.optional(types.literal("Verify"), "Verify"),
    payload: types.union(types.undefined, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class VerifyModelSelector extends QueryBuilder {
  get payload() { return this.__attr(`payload`) }
}
export function selectFromVerify() {
  return new VerifyModelSelector()
}

export const verifyModelPrimitives = selectFromVerify().payload
