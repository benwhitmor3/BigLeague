import { Instance } from "mobx-state-tree"
import { CreateLeagueMutationModelBase } from "./CreateLeagueMutationModel.base"

/* The TypeScript type of an instance of CreateLeagueMutationModel */
export interface CreateLeagueMutationModelType extends Instance<typeof CreateLeagueMutationModel.Type> {}

/* A graphql query fragment builders for CreateLeagueMutationModel */
export { selectFromCreateLeagueMutation, createLeagueMutationModelPrimitives, CreateLeagueMutationModelSelector } from "./CreateLeagueMutationModel.base"

/**
 * CreateLeagueMutationModel
 */
export const CreateLeagueMutationModel = CreateLeagueMutationModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
