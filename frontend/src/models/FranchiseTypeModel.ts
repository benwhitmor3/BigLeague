import {Instance} from "mobx-state-tree"
import {FranchiseTypeModelBase} from "./FranchiseTypeModel.base"
import {PlayerTypeModelType} from "./PlayerTypeModel";
import {ActionTypeModelType} from "./ActionTypeModel";

/* The TypeScript type of an instance of FranchiseTypeModel */
export interface FranchiseTypeModelType extends Instance<typeof FranchiseTypeModel.Type> {
}

/* A graphql query fragment builders for FranchiseTypeModel */
export {
    selectFromFranchiseType, franchiseTypeModelPrimitives, FranchiseTypeModelSelector
}from "./FranchiseTypeModel.base"

/**
 * FranchiseTypeModel
 */
export const FranchiseTypeModel = FranchiseTypeModelBase
    .actions(self => ({
        // This is an auto-generated example action.
        log() {
            console.log(JSON.stringify(self))
        }
    }))
    .views(self => ({
        get suitBonus() {
            let suitList = self.playerSet.map(function (player, index) {
                if (player.lineup == "starter")
                    return player.suit;
            });
            let spades = suitList.filter(x => x == "spade").length
            let hearts = suitList.filter(x => x == "heart").length
            let diamonds = suitList.filter(x => x == "diamond").length
            let clubs = suitList.filter(x => x == "club").length

            let suitBonus = 0

            // spade adjustment
            if (spades <= 1) {
                suitBonus += 0
            } else {
                suitBonus -= spades * (spades - 1)
            }
            // heart adjustment
            suitBonus += hearts * (5 - hearts)
            // diamond adjustment
            if (diamonds > 0) {
                suitBonus += 2 - (diamonds - 1)
            }
            // club adjustment
            suitBonus += (spades * clubs)

            return suitBonus
        },
        get epv() {
            let epv = self.playerSet.map(function (player) {
                if (player.lineup === "starter")
                    return player.epv;
            });

            return epv.reduce((accumulator, currentValue) => ((accumulator || 0) + (currentValue || 0)), 0)
        },
        get sEpv() {
            let sEpv = self.playerSet.map(function (player) {
                if (player.lineup === "starter")
                    return player.sEpv;
            });

            return sEpv.reduce((accumulator, currentValue) => ((accumulator || 0) + (currentValue || 0)), 0)
        },
        get meanAge() {
            let ages: any = self.playerSet.map(function (player) {
                return player.age;
            });

            let meanAge = ages.reduce((accumulator: any, currentValue: any) => ((accumulator || 0) + (currentValue || 0)), 0) / (ages.length)

            return meanAge
        },
        get salaries() {
            let salaries = self.playerSet.map(function (player) {
                return player.salary;
            });

            return salaries.reduce((accumulator, currentValue) => ((accumulator || 0) + (currentValue || 0)), 0)
        },
        get championships() {

            return (self.seasonSet.length === 1) ? self.seasonSet[self.seasonSet.length - 1].championships
                : self.seasonSet[self.seasonSet.length - 2].championships
        },
        get wins() {
            return (self.seasonSet.length === 1) ? self.seasonSet[self.seasonSet.length - 1].wins
                : self.seasonSet[self.seasonSet.length - 2].wins
        },
        get lineup() {
            let lineup = self.playerSet.map(function (player) {
                return player.lineup;
            });
            return lineup
        },
        get contracts() {
            let contracts = self.playerSet.map(function (player) {
                return player.contract
            });
            return contracts
        },
        get starters() {
            let starters = self.playerSet.filter(function (player) {
                if (player.lineup === "starter")
                    return player;
            });
            return starters
        },
        get unsignedPlayers() {
            let unsignedPlayers = self.playerSet.filter(function (player) {
                if (player.contract === null)
                    return player;
            });
            return unsignedPlayers
        },
        get unsetPlayers() {
            let unsetPlayers = self.playerSet.filter(function (player) {
                if (player.lineup === null)
                    return player;
            });
            return unsetPlayers
        },
        // get actions() {
        //     let action = self.action.map((act: ActionTypeModelType) => {
        //             return act
        //     })
        //     return action
        // },
    }))
