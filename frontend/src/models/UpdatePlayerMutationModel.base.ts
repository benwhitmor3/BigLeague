/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PlayerTypeModel, PlayerTypeModelType } from "./PlayerTypeModel"
import { PlayerTypeModelSelector } from "./PlayerTypeModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  player: PlayerTypeModelType;
}

/**
 * UpdatePlayerMutationBase
 * auto generated base class for the model UpdatePlayerMutationModel.
 */
export const UpdatePlayerMutationModelBase = withTypedRefs<Refs>()(ModelBase
  .named('UpdatePlayerMutation')
  .props({
    __typename: types.optional(types.literal("UpdatePlayerMutation"), "UpdatePlayerMutation"),
    player: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => PlayerTypeModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class UpdatePlayerMutationModelSelector extends QueryBuilder {
  player(builder?: string | PlayerTypeModelSelector | ((selector: PlayerTypeModelSelector) => PlayerTypeModelSelector)) { return this.__child(`player`, PlayerTypeModelSelector, builder) }
}
export function selectFromUpdatePlayerMutation() {
  return new UpdatePlayerMutationModelSelector()
}

export const updatePlayerMutationModelPrimitives = selectFromUpdatePlayerMutation()
