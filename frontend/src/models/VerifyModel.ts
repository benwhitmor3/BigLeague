import { Instance } from "mobx-state-tree"
import { VerifyModelBase } from "./VerifyModel.base"

/* The TypeScript type of an instance of VerifyModel */
export interface VerifyModelType extends Instance<typeof VerifyModel.Type> {}

/* A graphql query fragment builders for VerifyModel */
export { selectFromVerify, verifyModelPrimitives, VerifyModelSelector } from "./VerifyModel.base"

/**
 * VerifyModel
 */
export const VerifyModel = VerifyModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
