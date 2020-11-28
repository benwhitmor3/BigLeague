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
 * CreateUserBase
 * auto generated base class for the model CreateUserModel.
 */
export const CreateUserModelBase = withTypedRefs<Refs>()(ModelBase
  .named('CreateUser')
  .props({
    __typename: types.optional(types.literal("CreateUser"), "CreateUser"),
    message: types.union(types.undefined, types.null, types.string),
    user: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => UserTypeModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class CreateUserModelSelector extends QueryBuilder {
  get message() { return this.__attr(`message`) }
  user(builder?: string | UserTypeModelSelector | ((selector: UserTypeModelSelector) => UserTypeModelSelector)) { return this.__child(`user`, UserTypeModelSelector, builder) }
}
export function selectFromCreateUser() {
  return new CreateUserModelSelector()
}

export const createUserModelPrimitives = selectFromCreateUser().message
