import { Instance } from "mobx-state-tree"
import { PlayerMutationModelBase } from "./PlayerMutationModel.base"
import {PlayerInput} from "./RootStore.base";

/* The TypeScript type of an instance of PlayerMutationModel */
export interface PlayerMutationModelType extends Instance<typeof PlayerMutationModel.Type> {}

/* A graphql query fragment builders for PlayerMutationModel */
export { selectFromPlayerMutation, playerMutationModelPrimitives, PlayerMutationModelSelector } from "./PlayerMutationModel.base"

/**
 * PlayerMutationModel
 */
export const PlayerMutationModel = PlayerMutationModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    },
  }))
