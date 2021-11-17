import {Instance, types} from "mobx-state-tree"
import {LeagueTypeModelBase} from "./LeagueTypeModel.base"
import {FranchiseTypeModel, FranchiseTypeModelType} from "./FranchiseTypeModel";
import {PlayerTypeModelType} from "./PlayerTypeModel";

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
        setDraftingFranchise(franchise: FranchiseTypeModelType) {
            // @ts-ignore
            self.draftingFranchise = self.franchise(franchise.franchise)
        },
        setSeasonSimCheck(check: boolean) {
            // @ts-ignore
            self.seasonSimCheck = check
        },
    }))
    .props({
        draftingFranchise: types.union(types.undefined, types.reference(types.late(() => FranchiseTypeModel))),
        seasonSimCheck: types.union(types.undefined, types.boolean)
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
        franchiseplayers(franchiseName: string) {
            let franchiseplayers = self.playerSet.filter(function (player: any, index: any) {
                if (player.franchise)
                    if (player.franchise.franchise == franchiseName)
                        return true;
            });
            return franchiseplayers
        },
        get draftClass() {
            let draftClass = self.playerSet.filter((player: PlayerTypeModelType) => {
                if (player.year == 1)
                    return player
            })
            return draftClass
        },
        get bestDraftPlayer() {
            let draftClass = self.playerSet.filter((player: PlayerTypeModelType) => {
                if (player.year == 1 && player.franchise == null)
                    return player
            })
            let bestDraftPlayer = draftClass.sort(function (a, b) {
                // @ts-ignore
                return b.pv - a.pv;
            })
            return bestDraftPlayer[0]
        },
        get freeAgentClass() {
            let freeAgentClass = self.playerSet.filter((player: PlayerTypeModelType) => {
                if (player.year != 1 && player.contract == null)
                    return player
            })
            return freeAgentClass
        },
        get draftOrder() {
            let draftOrder = self.franchiseSet.sort(function (a, b) {
                // @ts-ignore
                return a.wins - b.wins;
            })
            return draftOrder
        },
        get franchisesWithoutGm(){
            return self.franchiseSet.map((franchise: FranchiseTypeModelType) => franchise.gm?.trait).filter((trait: any) => trait === undefined)
        },
        get franchisesWithoutCoach(){
            return self.franchiseSet.map((franchise: FranchiseTypeModelType) => franchise.coach?.attributeOne).filter((attributeOne: any) => attributeOne === undefined)
        },
    }))
