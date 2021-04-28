import {Instance, types} from "mobx-state-tree"
import { RootStoreBase } from "./RootStore.base"
import {UserTypeModel} from "./UserTypeModel";
import {FranchiseTypeModel} from "./FranchiseTypeModel";

export interface RootStoreType extends Instance<typeof RootStore.Type> {}

export const RootStore = RootStoreBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    },
  draft_mutation(player: any) {
        self.mutateRosterUpdate({
        "rosterInput": {
		"playerName": player.name,
		"franchiseFranchise": "test franchise",
        "lineup": 'starter'
	    }
      })
    }
  }))
  .props({
    User: types.union(
      types.undefined,
      types.null,
      types.reference(types.late((): any => UserTypeModel)),
    ),
  })
  .actions((self) => ({
      setUser(email: string) {
      const query = self.queryUser(
              {email: email},
              `
    __typename
    id
    email
    username
    
    `,
      {},
          ).then((data) => self.User! = self.userTypes!.get(data!.user!.id!))
  return query
      }
  }))


