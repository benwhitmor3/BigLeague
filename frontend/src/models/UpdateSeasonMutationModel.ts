import { Instance } from "mobx-state-tree"
import { UpdateSeasonMutationModelBase } from "./UpdateSeasonMutationModel.base"

/* The TypeScript type of an instance of UpdateSeasonMutationModel */
export interface UpdateSeasonMutationModelType extends Instance<typeof UpdateSeasonMutationModel.Type> {}

/* A graphql query fragment builders for UpdateSeasonMutationModel */
export { selectFromUpdateSeasonMutation, updateSeasonMutationModelPrimitives, UpdateSeasonMutationModelSelector } from "./UpdateSeasonMutationModel.base"

/**
 * UpdateSeasonMutationModel
 */
export const UpdateSeasonMutationModel = UpdateSeasonMutationModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
