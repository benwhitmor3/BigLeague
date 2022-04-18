import { Instance } from "mobx-state-tree"
import { UpdatePlayerMutationModelBase } from "./UpdatePlayerMutationModel.base"

/* The TypeScript type of an instance of UpdatePlayerMutationModel */
export interface UpdatePlayerMutationModelType extends Instance<typeof UpdatePlayerMutationModel.Type> {}

/* A graphql query fragment builders for UpdatePlayerMutationModel */
export { selectFromUpdatePlayerMutation, updatePlayerMutationModelPrimitives, UpdatePlayerMutationModelSelector } from "./UpdatePlayerMutationModel.base"

/**
 * UpdatePlayerMutationModel
 */
export const UpdatePlayerMutationModel = UpdatePlayerMutationModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
