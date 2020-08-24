import { Instance } from "mobx-state-tree"
import { StaffTypeModelBase } from "./StaffTypeModel.base"

/* The TypeScript type of an instance of StaffTypeModel */
export interface StaffTypeModelType extends Instance<typeof StaffTypeModel.Type> {}

/* A graphql query fragment builders for StaffTypeModel */
export { selectFromStaffType, staffTypeModelPrimitives, StaffTypeModelSelector } from "./StaffTypeModel.base"

/**
 * StaffTypeModel
 */
export const StaffTypeModel = StaffTypeModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
