/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PlayerTypeModel, PlayerTypeModelType } from "./PlayerTypeModel"
import { PlayerTypeModelSelector } from "./PlayerTypeModel.base"
import { RootStoreType } from "./index"


/**
 * PlayerMutationBase
 * auto generated base class for the model PlayerMutationModel.
 */
export const PlayerMutationModelBase = ModelBase
  .named('PlayerMutation')
  .props({
    __typename: types.optional(types.literal("PlayerMutation"), "PlayerMutation"),
    player: types.union(types.undefined, types.null, types.late((): any => PlayerTypeModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PlayerMutationModelSelector extends QueryBuilder {
  player(builder?: string | PlayerTypeModelSelector | ((selector: PlayerTypeModelSelector) => PlayerTypeModelSelector)) { return this.__child(`player`, PlayerTypeModelSelector, builder) }
}
export function selectFromPlayerMutation() {
  return new PlayerMutationModelSelector()
}

export const playerMutationModelPrimitives = selectFromPlayerMutation()
