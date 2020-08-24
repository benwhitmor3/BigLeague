import { Instance } from "mobx-state-tree"
import { LeagueMutationModelBase } from "./LeagueMutationModel.base"

/* The TypeScript type of an instance of LeagueMutationModel */
export interface LeagueMutationModelType extends Instance<typeof LeagueMutationModel.Type> {}

/* A graphql query fragment builders for LeagueMutationModel */
export { selectFromLeagueMutation, leagueMutationModelPrimitives, LeagueMutationModelSelector } from "./LeagueMutationModel.base"

/**
 * LeagueMutationModel
 */
export const LeagueMutationModel = LeagueMutationModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
