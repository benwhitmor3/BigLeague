import { Instance } from "mobx-state-tree"
import { SeasonTypeModelBase } from "./SeasonTypeModel.base"

/* The TypeScript type of an instance of SeasonTypeModel */
export interface SeasonTypeModelType extends Instance<typeof SeasonTypeModel.Type> {}

/* A graphql query fragment builders for SeasonTypeModel */
export { selectFromSeasonType, seasonTypeModelPrimitives, SeasonTypeModelSelector } from "./SeasonTypeModel.base"

/**
 * SeasonTypeModel
 */
export const SeasonTypeModel = SeasonTypeModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
