import {Instance, types} from "mobx-state-tree"
import {LeagueTypeModelBase} from "./LeagueTypeModel.base"
import {FranchiseTypeModel} from "./FranchiseTypeModel";
import {UserTypeModel} from "./UserTypeModel";

/* The TypeScript type of an instance of LeagueTypeModel */
export interface LeagueTypeModelType extends Instance<typeof LeagueTypeModel.Type> {
}

/* A graphql query fragment builders for LeagueTypeModel */
export {selectFromLeagueType, leagueTypeModelPrimitives, LeagueTypeModelSelector} from "./LeagueTypeModel.base"

/**
 * LeagueTypeModel
 */
export const LeagueTypeModel = LeagueTypeModelBase
    .actions(self => ({
        // This is an auto-generated example action.
        log() {
            console.log(JSON.stringify(self))
        },
        setDraftingFranchise(franchiseName: string) {
            // @ts-ignore
            self.draftingFranchise = self.franchise(franchiseName)
            console.log(franchiseName)
        },
    }))
    .props({
        draftingFranchise: types.union(types.undefined, types.reference(types.late(() => FranchiseTypeModel))),
    })
    .views(self => ({
        franchise(franchiseName: string) {
            let franchise = self.franchiseSet.find(function (franchise, index) {
                if (franchise.franchise == franchiseName)
                    return true;
            });
            return franchise
        },
        player(playerName: string) {
            let player = self.playerSet.find(function (player, index) {
                if (player.name == playerName)
                    return true;
            });
            return player
        },
        franchiseplayers(franchiseName: string){
            let franchiseplayers = self.playerSet.filter(function (player: any, index: any) {
                if (player.franchise.franchise == franchiseName)
                    return true;
            });
            return franchiseplayers
        },
    }))
