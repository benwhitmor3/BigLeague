import { Instance } from "mobx-state-tree"
import { ObtainJsonWebTokenModelBase } from "./ObtainJsonWebTokenModel.base"

/* The TypeScript type of an instance of ObtainJsonWebTokenModel */
export interface ObtainJsonWebTokenModelType extends Instance<typeof ObtainJsonWebTokenModel.Type> {}

/* A graphql query fragment builders for ObtainJsonWebTokenModel */
export { selectFromObtainJsonWebToken, obtainJsonWebTokenModelPrimitives, ObtainJsonWebTokenModelSelector } from "./ObtainJsonWebTokenModel.base"

/**
 * ObtainJsonWebTokenModel
 *
 * Obtain JSON Web Token mutation
 */
export const ObtainJsonWebTokenModel = ObtainJsonWebTokenModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
