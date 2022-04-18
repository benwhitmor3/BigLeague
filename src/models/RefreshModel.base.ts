/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * RefreshBase
 * auto generated base class for the model RefreshModel.
 */
export const RefreshModelBase = ModelBase
  .named('Refresh')
  .props({
    __typename: types.optional(types.literal("Refresh"), "Refresh"),
    payload: types.union(types.undefined, types.frozen()),
    refreshExpiresIn: types.union(types.undefined, types.integer),
    token: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class RefreshModelSelector extends QueryBuilder {
  get payload() { return this.__attr(`payload`) }
  get refreshExpiresIn() { return this.__attr(`refreshExpiresIn`) }
  get token() { return this.__attr(`token`) }
}
export function selectFromRefresh() {
  return new RefreshModelSelector()
}

export const refreshModelPrimitives = selectFromRefresh().payload.refreshExpiresIn.token
