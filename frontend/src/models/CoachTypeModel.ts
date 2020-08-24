import { Instance } from "mobx-state-tree"
import { CoachTypeModelBase } from "./CoachTypeModel.base"

/* The TypeScript type of an instance of CoachTypeModel */
export interface CoachTypeModelType extends Instance<typeof CoachTypeModel.Type> {}

/* A graphql query fragment builders for CoachTypeModel */
export { selectFromCoachType, coachTypeModelPrimitives, CoachTypeModelSelector } from "./CoachTypeModel.base"

/**
 * CoachTypeModel
 */
export const CoachTypeModel = CoachTypeModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
