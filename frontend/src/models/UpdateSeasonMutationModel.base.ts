/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SeasonTypeModel, SeasonTypeModelType } from "./SeasonTypeModel"
import { SeasonTypeModelSelector } from "./SeasonTypeModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  season: SeasonTypeModelType;
}

/**
 * UpdateSeasonMutationBase
 * auto generated base class for the model UpdateSeasonMutationModel.
 */
export const UpdateSeasonMutationModelBase = withTypedRefs<Refs>()(ModelBase
  .named('UpdateSeasonMutation')
  .props({
    __typename: types.optional(types.literal("UpdateSeasonMutation"), "UpdateSeasonMutation"),
    season: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => SeasonTypeModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class UpdateSeasonMutationModelSelector extends QueryBuilder {
  season(builder?: string | SeasonTypeModelSelector | ((selector: SeasonTypeModelSelector) => SeasonTypeModelSelector)) { return this.__child(`season`, SeasonTypeModelSelector, builder) }
}
export function selectFromUpdateSeasonMutation() {
  return new UpdateSeasonMutationModelSelector()
}

export const updateSeasonMutationModelPrimitives = selectFromUpdateSeasonMutation()
