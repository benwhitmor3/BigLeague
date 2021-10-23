import { Instance } from "mobx-state-tree"
import { CreateStadiumMutationModelBase } from "./CreateStadiumMutationModel.base"

/* The TypeScript type of an instance of CreateStadiumMutationModel */
export interface CreateStadiumMutationModelType extends Instance<typeof CreateStadiumMutationModel.Type> {}

/* A graphql query fragment builders for CreateStadiumMutationModel */
export { selectFromCreateStadiumMutation, createStadiumMutationModelPrimitives, CreateStadiumMutationModelSelector } from "./CreateStadiumMutationModel.base"

/**
 * CreateStadiumMutationModel
 */
export const CreateStadiumMutationModel = CreateStadiumMutationModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
