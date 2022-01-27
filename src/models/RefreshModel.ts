import { Instance } from "mobx-state-tree"
import { RefreshModelBase } from "./RefreshModel.base"

/* The TypeScript type of an instance of RefreshModel */
export interface RefreshModelType extends Instance<typeof RefreshModel.Type> {}

/* A graphql query fragment builders for RefreshModel */
export { selectFromRefresh, refreshModelPrimitives, RefreshModelSelector } from "./RefreshModel.base"

/**
 * RefreshModel
 */
export const RefreshModel = RefreshModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
