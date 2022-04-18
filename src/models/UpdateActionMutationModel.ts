import { Instance } from "mobx-state-tree"
import { UpdateActionMutationModelBase } from "./UpdateActionMutationModel.base"

/* The TypeScript type of an instance of UpdateActionMutationModel */
export interface UpdateActionMutationModelType extends Instance<typeof UpdateActionMutationModel.Type> {}

/* A graphql query fragment builders for UpdateActionMutationModel */
export { selectFromUpdateActionMutation, updateActionMutationModelPrimitives, UpdateActionMutationModelSelector } from "./UpdateActionMutationModel.base"

/**
 * UpdateActionMutationModel
 */
export const UpdateActionMutationModel = UpdateActionMutationModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
