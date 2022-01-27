import 'antd/dist/antd.css';
import {FranchiseTypeModelType, LeagueTypeModelType} from "../../../models";
import {lineupError, rosterError, staffError, starterError, unsignedError} from "../../Atoms/notificationerrors";


export const simSeasonChecker = (franchise: FranchiseTypeModelType, league: LeagueTypeModelType) => {
    // every team needs at least 5 players
    if (franchise.playerSet.length < 5) {
        league.setSeasonSimCheck(false)
        return rosterError(franchise.franchise);
    }
    // all players with a franchise need a lineup
    if (franchise.lineup.includes(null)) {
        league.setSeasonSimCheck(false)
        return lineupError(franchise.franchise);
    }
    // each franchise needs 5 starters
    if (franchise.starters.length !== 5) {
        league.setSeasonSimCheck(false)
        return starterError(franchise.franchise);
    }
    // all players with a franchise need to be signed
    if (franchise.contracts.includes(null)) {
        league.setSeasonSimCheck(false)
        return unsignedError(franchise.franchise);
    }
    // all franchises need staff
    if (!franchise.gm || !franchise.coach) {
        league.setSeasonSimCheck(false)
        return staffError(franchise.franchise);
    }
}