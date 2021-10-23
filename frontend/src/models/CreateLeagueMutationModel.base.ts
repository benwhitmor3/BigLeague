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
 * CreateLeagueMutationBase
 * auto generated base class for the model CreateLeagueMutationModel.
 */
export const CreateLeagueMutationModelBase = withTypedRefs<Refs>()(ModelBase
  .named('CreateLeagueMutation')
  .props({
    __typename: types.optional(types.literal("CreateLeagueMutation"), "CreateLeagueMutation"),
    leagueName: types.union(types.undefined, types.null, types.string),
    user: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => UserTypeModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class CreateLeagueMutationModelSelector extends QueryBuilder {
  get leagueName() { return this.__attr(`leagueName`) }
  user(builder?: string | UserTypeModelSelector | ((selector: UserTypeModelSelector) => UserTypeModelSelector)) { return this.__child(`user`, UserTypeModelSelector, builder) }
}
export function selectFromCreateLeagueMutation() {
  return new CreateLeagueMutationModelSelector()
}

export const createLeagueMutationModelPrimitives = selectFromCreateLeagueMutation().leagueName
