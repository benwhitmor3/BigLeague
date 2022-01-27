import { Instance } from "mobx-state-tree"
import { CreateFranchiseMutationModelBase } from "./CreateFranchiseMutationModel.base"

/* The TypeScript type of an instance of CreateFranchiseMutationModel */
export interface CreateFranchiseMutationModelType extends Instance<typeof CreateFranchiseMutationModel.Type> {}

/* A graphql query fragment builders for CreateFranchiseMutationModel */
export { selectFromCreateFranchiseMutation, createFranchiseMutationModelPrimitives, CreateFranchiseMutationModelSelector } from "./CreateFranchiseMutationModel.base"

/**
 * CreateFranchiseMutationModel
 */
export const CreateFranchiseMutationModel = CreateFranchiseMutationModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
