import { Instance } from "mobx-state-tree"
import { RootStoreBase } from "./RootStore.base"

export interface RootStoreType extends Instance<typeof RootStore.Type> {}

export const RootStore = RootStoreBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    },
    getFranchise() {
    const query = self.queryAllFranchise(
      {},
      `
    franchise
    `,
      {},
    )
    return query
  },
    getUser() {
    return self.userTypes.get('2')
  },
  }))
