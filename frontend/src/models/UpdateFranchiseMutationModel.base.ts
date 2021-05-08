/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { CoachTypeModel, CoachTypeModelType } from "./CoachTypeModel"
import { CoachTypeModelSelector } from "./CoachTypeModel.base"
import { FranchiseTypeModel, FranchiseTypeModelType } from "./FranchiseTypeModel"
import { FranchiseTypeModelSelector } from "./FranchiseTypeModel.base"
import { GmTypeModel, GmTypeModelType } from "./GmTypeModel"
import { GmTypeModelSelector } from "./GmTypeModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  franchise: FranchiseTypeModelType;
  gm: GmTypeModelType;
  coach: CoachTypeModelType;
}

/**
 * UpdateFranchiseMutationBase
 * auto generated base class for the model UpdateFranchiseMutationModel.
 */
export const UpdateFranchiseMutationModelBase = withTypedRefs<Refs>()(ModelBase
  .named('UpdateFranchiseMutation')
  .props({
    __typename: types.optional(types.literal("UpdateFranchiseMutation"), "UpdateFranchiseMutation"),
    franchise: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => FranchiseTypeModel))),
    gm: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => GmTypeModel))),
    coach: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => CoachTypeModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class UpdateFranchiseMutationModelSelector extends QueryBuilder {
  franchise(builder?: string | FranchiseTypeModelSelector | ((selector: FranchiseTypeModelSelector) => FranchiseTypeModelSelector)) { return this.__child(`franchise`, FranchiseTypeModelSelector, builder) }
  gm(builder?: string | GmTypeModelSelector | ((selector: GmTypeModelSelector) => GmTypeModelSelector)) { return this.__child(`gm`, GmTypeModelSelector, builder) }
  coach(builder?: string | CoachTypeModelSelector | ((selector: CoachTypeModelSelector) => CoachTypeModelSelector)) { return this.__child(`coach`, CoachTypeModelSelector, builder) }
}
export function selectFromUpdateFranchiseMutation() {
  return new UpdateFranchiseMutationModelSelector()
}

export const updateFranchiseMutationModelPrimitives = selectFromUpdateFranchiseMutation()
