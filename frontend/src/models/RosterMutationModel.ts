import { Instance } from "mobx-state-tree"
import { RosterMutationModelBase } from "./RosterMutationModel.base"

/* The TypeScript type of an instance of RosterMutationModel */
export interface RosterMutationModelType extends Instance<typeof RosterMutationModel.Type> {}

/* A graphql query fragment builders for RosterMutationModel */
export { selectFromRosterMutation, rosterMutationModelPrimitives, RosterMutationModelSelector } from "./RosterMutationModel.base"

/**
 * RosterMutationModel
 */
export const RosterMutationModel = RosterMutationModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
