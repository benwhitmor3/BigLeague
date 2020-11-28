import { Instance } from "mobx-state-tree"
import { StadiumMutationModelBase } from "./StadiumMutationModel.base"

/* The TypeScript type of an instance of StadiumMutationModel */
export interface StadiumMutationModelType extends Instance<typeof StadiumMutationModel.Type> {}

/* A graphql query fragment builders for StadiumMutationModel */
export { selectFromStadiumMutation, stadiumMutationModelPrimitives, StadiumMutationModelSelector } from "./StadiumMutationModel.base"

/**
 * StadiumMutationModel
 */
export const StadiumMutationModel = StadiumMutationModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
