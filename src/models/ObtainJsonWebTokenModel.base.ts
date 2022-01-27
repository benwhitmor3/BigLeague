/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * ObtainJsonWebTokenBase
 * auto generated base class for the model ObtainJsonWebTokenModel.
 *
 * Obtain JSON Web Token mutation
 */
export const ObtainJsonWebTokenModelBase = ModelBase
  .named('ObtainJsonWebToken')
  .props({
    __typename: types.optional(types.literal("ObtainJSONWebToken"), "ObtainJSONWebToken"),
    payload: types.union(types.undefined, types.frozen()),
    refreshExpiresIn: types.union(types.undefined, types.integer),
    token: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ObtainJsonWebTokenModelSelector extends QueryBuilder {
  get payload() { return this.__attr(`payload`) }
  get refreshExpiresIn() { return this.__attr(`refreshExpiresIn`) }
  get token() { return this.__attr(`token`) }
}
export function selectFromObtainJsonWebToken() {
  return new ObtainJsonWebTokenModelSelector()
}

export const obtainJsonWebTokenModelPrimitives = selectFromObtainJsonWebToken().payload.refreshExpiresIn.token
