import { Instance } from "mobx-state-tree"
import { CreateUserModelBase } from "./CreateUserModel.base"

/* The TypeScript type of an instance of CreateUserModel */
export interface CreateUserModelType extends Instance<typeof CreateUserModel.Type> {}

/* A graphql query fragment builders for CreateUserModel */
export { selectFromCreateUser, createUserModelPrimitives, CreateUserModelSelector } from "./CreateUserModel.base"

/**
 * CreateUserModel
 */
export const CreateUserModel = CreateUserModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
