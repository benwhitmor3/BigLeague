import { Instance } from "mobx-state-tree"
import { GmTypeModelBase } from "./GmTypeModel.base"

/* The TypeScript type of an instance of GmTypeModel */
export interface GmTypeModelType extends Instance<typeof GmTypeModel.Type> {}

/* A graphql query fragment builders for GmTypeModel */
export { selectFromGmType, gmTypeModelPrimitives, GmTypeModelSelector } from "./GmTypeModel.base"

/**
 * GmTypeModel
 */
export const GmTypeModel = GmTypeModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
