import { Instance } from "mobx-state-tree"
import { PlayerHistoryTypeModelBase } from "./PlayerHistoryTypeModel.base"

/* The TypeScript type of an instance of PlayerHistoryTypeModel */
export interface PlayerHistoryTypeModelType extends Instance<typeof PlayerHistoryTypeModel.Type> {}

/* A graphql query fragment builders for PlayerHistoryTypeModel */
export { selectFromPlayerHistoryType, playerHistoryTypeModelPrimitives, PlayerHistoryTypeModelSelector } from "./PlayerHistoryTypeModel.base"

/**
 * PlayerHistoryTypeModel
 */
export const PlayerHistoryTypeModel = PlayerHistoryTypeModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
