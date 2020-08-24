import { Instance } from "mobx-state-tree"
import { ActionTypeModelBase } from "./ActionTypeModel.base"

/* The TypeScript type of an instance of ActionTypeModel */
export interface ActionTypeModelType extends Instance<typeof ActionTypeModel.Type> {}

/* A graphql query fragment builders for ActionTypeModel */
export { selectFromActionType, actionTypeModelPrimitives, ActionTypeModelSelector } from "./ActionTypeModel.base"

/**
 * ActionTypeModel
 */
export const ActionTypeModel = ActionTypeModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
