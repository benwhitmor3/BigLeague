import { Instance } from "mobx-state-tree"
import { UpdateStadiumMutationModelBase } from "./UpdateStadiumMutationModel.base"

/* The TypeScript type of an instance of UpdateStadiumMutationModel */
export interface UpdateStadiumMutationModelType extends Instance<typeof UpdateStadiumMutationModel.Type> {}

/* A graphql query fragment builders for UpdateStadiumMutationModel */
export { selectFromUpdateStadiumMutation, updateStadiumMutationModelPrimitives, UpdateStadiumMutationModelSelector } from "./UpdateStadiumMutationModel.base"

/**
 * UpdateStadiumMutationModel
 */
export const UpdateStadiumMutationModel = UpdateStadiumMutationModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
