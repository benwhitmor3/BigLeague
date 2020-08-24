import { Instance } from "mobx-state-tree"
import { RosterTypeModelBase } from "./RosterTypeModel.base"

/* The TypeScript type of an instance of RosterTypeModel */
export interface RosterTypeModelType extends Instance<typeof RosterTypeModel.Type> {}

/* A graphql query fragment builders for RosterTypeModel */
export { selectFromRosterType, rosterTypeModelPrimitives, RosterTypeModelSelector } from "./RosterTypeModel.base"

/**
 * RosterTypeModel
 */
export const RosterTypeModel = RosterTypeModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
