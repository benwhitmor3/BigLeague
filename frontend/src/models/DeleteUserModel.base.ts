/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UserTypeModel, UserTypeModelType } from "./UserTypeModel"
import { UserTypeModelSelector } from "./UserTypeModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  user: UserTypeModelType;
}

/**
 * DeleteUserBase
 * auto generated base class for the model DeleteUserModel.
 */
export const DeleteUserModelBase = withTypedRefs<Refs>()(ModelBase
  .named('DeleteUser')
  .props({
    __typename: types.optional(types.literal("DeleteUser"), "DeleteUser"),
    message: types.union(types.undefined, types.null, types.string),
    user: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => UserTypeModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class DeleteUserModelSelector extends QueryBuilder {
  get message() { return this.__attr(`message`) }
  user(builder?: string | UserTypeModelSelector | ((selector: UserTypeModelSelector) => UserTypeModelSelector)) { return this.__child(`user`, UserTypeModelSelector, builder) }
}
export function selectFromDeleteUser() {
  return new DeleteUserModelSelector()
}

export const deleteUserModelPrimitives = selectFromDeleteUser().message
