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
            return self.franchiseSet.find((franchise) => franchise.franchise === franchiseName);
        },
        player(playerName: string) {
            return self.playerSet.find((player) => player.name === playerName);
        },
        franchiseplayers(franchiseName: string) {
            return self.playerSet.filter((player) => {
                return player.franchise && player.franchise.franchise === franchiseName;
            });
        },
        get draftClass() {
            return self.playerSet.filter((player: PlayerTypeModelType) => player.year === 1);
        },
        get draftClassDrafted() {
            return self.playerSet.filter((player: PlayerTypeModelType) => player.year === 1 && player.franchise).length;
        },
        get draftClassRemaining(){
            return self.playerSet.filter((player: PlayerTypeModelType) => player.year === 1 && !player.franchise).length;
        },
        get bestDraftPlayer() {
            let draftClass = self.playerSet.filter((player: PlayerTypeModelType) => player.year === 1 && player.franchise === null);
            let sortedPlayers = draftClass.sort((a, b) => b.overallValue - a.overallValue);
            return sortedPlayers[0];
        },
        get freeAgentClass() {
            return self.playerSet.filter((player: PlayerTypeModelType) => player.year !== 1 && !player.contract)
        },
        get freeAgentClassSigned() {
            return self.playerSet.filter((player: PlayerTypeModelType) => player.year !== 1 && !player.contract && player.franchise)
        },
        get draftOrder() {
            // @ts-ignore
            return self.franchiseSet.sort((a, b) => a.wins - b.wins);
        },
        get franchisesWithoutGm(){
            return self.franchiseSet.map((franchise: FranchiseTypeModelType) => franchise.gm?.trait).filter((trait: any) => trait === undefined)
        },
        get franchisesWithoutCoach(){
            return self.franchiseSet.map((franchise: FranchiseTypeModelType) => franchise.coach?.attributeOne).filter((attributeOne: any) => attributeOne === undefined)
        },
    }))
