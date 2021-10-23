/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { FranchiseTypeModel, FranchiseTypeModelType } from "./FranchiseTypeModel"
import { FranchiseTypeModelSelector } from "./FranchiseTypeModel.base"
import { LeagueTypeModel, LeagueTypeModelType } from "./LeagueTypeModel"
import { LeagueTypeModelSelector } from "./LeagueTypeModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  franchise: FranchiseTypeModelType;
  league: LeagueTypeModelType;
}

/**
 * UserTypeBase
 * auto generated base class for the model UserTypeModel.
 */
export const UserTypeModelBase = withTypedRefs<Refs>()(ModelBase
  .named('UserType')
  .props({
    __typename: types.optional(types.literal("UserType"), "UserType"),
    id: types.identifier,
    password: types.union(types.undefined, types.string),
    email: types.union(types.undefined, types.string),
    username: types.union(types.undefined, types.string),
    dateJoined: types.union(types.undefined, types.frozen()),
    lastLogin: types.union(types.undefined, types.frozen()),
    isAdmin: types.union(types.undefined, types.boolean),
    isActive: types.union(types.undefined, types.boolean),
    isStaff: types.union(types.undefined, types.boolean),
    isSuperuser: types.union(types.undefined, types.boolean),
    franchise: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => FranchiseTypeModel))),
    league: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => LeagueTypeModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class UserTypeModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get password() { return this.__attr(`password`) }
  get email() { return this.__attr(`email`) }
  get username() { return this.__attr(`username`) }
  get dateJoined() { return this.__attr(`dateJoined`) }
  get lastLogin() { return this.__attr(`lastLogin`) }
  get isAdmin() { return this.__attr(`isAdmin`) }
  get isActive() { return this.__attr(`isActive`) }
  get isStaff() { return this.__attr(`isStaff`) }
  get isSuperuser() { return this.__attr(`isSuperuser`) }
  franchise(builder?: string | FranchiseTypeModelSelector | ((selector: FranchiseTypeModelSelector) => FranchiseTypeModelSelector)) { return this.__child(`franchise`, FranchiseTypeModelSelector, builder) }
  league(builder?: string | LeagueTypeModelSelector | ((selector: LeagueTypeModelSelector) => LeagueTypeModelSelector)) { return this.__child(`league`, LeagueTypeModelSelector, builder) }
}
export function selectFromUserType() {
  return new UserTypeModelSelector()
}

export const userTypeModelPrimitives = selectFromUserType().password.email.username.dateJoined.lastLogin.isAdmin.isActive.isStaff.isSuperuser
