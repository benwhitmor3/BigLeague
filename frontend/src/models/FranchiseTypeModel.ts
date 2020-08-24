import { Instance } from "mobx-state-tree"
import { FranchiseTypeModelBase } from "./FranchiseTypeModel.base"

/* The TypeScript type of an instance of FranchiseTypeModel */
export interface FranchiseTypeModelType extends Instance<typeof FranchiseTypeModel.Type> {}

/* A graphql query fragment builders for FranchiseTypeModel */
export { selectFromFranchiseType, franchiseTypeModelPrimitives, FranchiseTypeModelSelector } from "./FranchiseTypeModel.base"

/**
 * FranchiseTypeModel
 */
export const FranchiseTypeModel = FranchiseTypeModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
