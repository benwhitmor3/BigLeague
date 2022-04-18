import { Instance } from "mobx-state-tree"
import { UpdateRosterMutationModelBase } from "./UpdateRosterMutationModel.base"

/* The TypeScript type of an instance of UpdateRosterMutationModel */
export interface UpdateRosterMutationModelType extends Instance<typeof UpdateRosterMutationModel.Type> {}

/* A graphql query fragment builders for UpdateRosterMutationModel */
export { selectFromUpdateRosterMutation, updateRosterMutationModelPrimitives, UpdateRosterMutationModelSelector } from "./UpdateRosterMutationModel.base"

/**
 * UpdateRosterMutationModel
 */
export const UpdateRosterMutationModel = UpdateRosterMutationModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
