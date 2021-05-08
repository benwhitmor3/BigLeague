import { Instance } from "mobx-state-tree"
import { DeleteUserModelBase } from "./DeleteUserModel.base"

/* The TypeScript type of an instance of DeleteUserModel */
export interface DeleteUserModelType extends Instance<typeof DeleteUserModel.Type> {}

/* A graphql query fragment builders for DeleteUserModel */
export { selectFromDeleteUser, deleteUserModelPrimitives, DeleteUserModelSelector } from "./DeleteUserModel.base"

/**
 * DeleteUserModel
 */
export const DeleteUserModel = DeleteUserModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
