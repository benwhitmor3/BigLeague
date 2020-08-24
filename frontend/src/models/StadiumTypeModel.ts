import { Instance } from "mobx-state-tree"
import { StadiumTypeModelBase } from "./StadiumTypeModel.base"

/* The TypeScript type of an instance of StadiumTypeModel */
export interface StadiumTypeModelType extends Instance<typeof StadiumTypeModel.Type> {}

/* A graphql query fragment builders for StadiumTypeModel */
export { selectFromStadiumType, stadiumTypeModelPrimitives, StadiumTypeModelSelector } from "./StadiumTypeModel.base"

/**
 * StadiumTypeModel
 */
export const StadiumTypeModel = StadiumTypeModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
