import { Instance } from "mobx-state-tree"
import { UpdateFranchiseMutationModelBase } from "./UpdateFranchiseMutationModel.base"

/* The TypeScript type of an instance of UpdateFranchiseMutationModel */
export interface UpdateFranchiseMutationModelType extends Instance<typeof UpdateFranchiseMutationModel.Type> {}

/* A graphql query fragment builders for UpdateFranchiseMutationModel */
export { selectFromUpdateFranchiseMutation, updateFranchiseMutationModelPrimitives, UpdateFranchiseMutationModelSelector } from "./UpdateFranchiseMutationModel.base"

/**
 * UpdateFranchiseMutationModel
 */
export const UpdateFranchiseMutationModel = UpdateFranchiseMutationModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
