import {Instance, types} from "mobx-state-tree"
import { RootStoreBase } from "./RootStore.base"
import {UserTypeModel} from "./UserTypeModel";
import {useQuery} from "./reactUtils";

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
      types.reference(types.late(() => UserTypeModel)),
    ),
  })
  .actions((self) => ({
      setUser(email: string) {
      const query = self.queryUser(
              {email: email},
              `
      id
      email
      username
      franchise{
        franchise
      }
      __typename
    `,
              {fetchPolicy: 'cache-first'},
          )
          // @ts-ignore
    self.User = self.userTypes.get(query!.data!.user.id)
    return self.User
      }
  }))


