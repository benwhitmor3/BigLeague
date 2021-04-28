/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { StadiumTypeModel, StadiumTypeModelType } from "./StadiumTypeModel"
import { StadiumTypeModelSelector } from "./StadiumTypeModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  stadium: StadiumTypeModelType;
}

/**
 * StadiumMutationBase
 * auto generated base class for the model StadiumMutationModel.
 */
export const StadiumMutationModelBase = withTypedRefs<Refs>()(ModelBase
  .named('StadiumMutation')
  .props({
    __typename: types.optional(types.literal("StadiumMutation"), "StadiumMutation"),
    stadium: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => StadiumTypeModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class StadiumMutationModelSelector extends QueryBuilder {
  stadium(builder?: string | StadiumTypeModelSelector | ((selector: StadiumTypeModelSelector) => StadiumTypeModelSelector)) { return this.__child(`stadium`, StadiumTypeModelSelector, builder) }
}
export function selectFromStadiumMutation() {
  return new StadiumMutationModelSelector()
}

export const stadiumMutationModelPrimitives = selectFromStadiumMutation()
