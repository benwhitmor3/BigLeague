/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { UserTypeModel, UserTypeModelType } from "./UserTypeModel"
import { userTypeModelPrimitives, UserTypeModelSelector } from "./UserTypeModel.base"
import { FranchiseTypeModel, FranchiseTypeModelType } from "./FranchiseTypeModel"
import { franchiseTypeModelPrimitives, FranchiseTypeModelSelector } from "./FranchiseTypeModel.base"
import { LeagueTypeModel, LeagueTypeModelType } from "./LeagueTypeModel"
import { leagueTypeModelPrimitives, LeagueTypeModelSelector } from "./LeagueTypeModel.base"
import { StadiumTypeModel, StadiumTypeModelType } from "./StadiumTypeModel"
import { stadiumTypeModelPrimitives, StadiumTypeModelSelector } from "./StadiumTypeModel.base"
import { CityTypeModel, CityTypeModelType } from "./CityTypeModel"
import { cityTypeModelPrimitives, CityTypeModelSelector } from "./CityTypeModel.base"
import { ActionTypeModel, ActionTypeModelType } from "./ActionTypeModel"
import { actionTypeModelPrimitives, ActionTypeModelSelector } from "./ActionTypeModel.base"
import { SeasonTypeModel, SeasonTypeModelType } from "./SeasonTypeModel"
import { seasonTypeModelPrimitives, SeasonTypeModelSelector } from "./SeasonTypeModel.base"
import { StaffTypeModel, StaffTypeModelType } from "./StaffTypeModel"
import { staffTypeModelPrimitives, StaffTypeModelSelector } from "./StaffTypeModel.base"
import { GmTypeModel, GmTypeModelType } from "./GmTypeModel"
import { gmTypeModelPrimitives, GmTypeModelSelector } from "./GmTypeModel.base"
import { CoachTypeModel, CoachTypeModelType } from "./CoachTypeModel"
import { coachTypeModelPrimitives, CoachTypeModelSelector } from "./CoachTypeModel.base"
import { RosterTypeModel, RosterTypeModelType } from "./RosterTypeModel"
import { rosterTypeModelPrimitives, RosterTypeModelSelector } from "./RosterTypeModel.base"
import { PlayerTypeModel, PlayerTypeModelType } from "./PlayerTypeModel"
import { playerTypeModelPrimitives, PlayerTypeModelSelector } from "./PlayerTypeModel.base"
import { LeagueMutationModel, LeagueMutationModelType } from "./LeagueMutationModel"
import { leagueMutationModelPrimitives, LeagueMutationModelSelector } from "./LeagueMutationModel.base"
import { PlayerMutationModel, PlayerMutationModelType } from "./PlayerMutationModel"
import { playerMutationModelPrimitives, PlayerMutationModelSelector } from "./PlayerMutationModel.base"


import { GmTrait } from "./GmTraitEnum"
import { CoachAttributeOne } from "./CoachAttributeOneEnum"
import { CoachAttributeTwo } from "./CoachAttributeTwoEnum"

export type PlayerInput = {
  name: string
  suit: string
  age: number
  pv: number
  epv: number
  sEpv: number
}
/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  userTypes: ObservableMap<string, UserTypeModelType>
  playerTypes: ObservableMap<string, PlayerTypeModelType>
}


/**
* Enums for the names of base graphql actions
*/
export enum RootStoreBaseQueries {
queryAllUser="queryAllUser",
queryAllFranchise="queryAllFranchise",
queryAllLeague="queryAllLeague",
queryAllCity="queryAllCity",
queryAllStadium="queryAllStadium",
queryAllGm="queryAllGm",
queryAllCoach="queryAllCoach",
queryAllPlayer="queryAllPlayer",
queryAllAction="queryAllAction",
queryAllSeason="queryAllSeason",
queryAllStaff="queryAllStaff",
queryAllRoster="queryAllRoster",
queryPlayer="queryPlayer"
}
export enum RootStoreBaseMutations {
mutateUpdateLeague="mutateUpdateLeague",
mutateCreatePlayer="mutateCreatePlayer"
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['UserType', () => UserTypeModel], ['FranchiseType', () => FranchiseTypeModel], ['LeagueType', () => LeagueTypeModel], ['StadiumType', () => StadiumTypeModel], ['CityType', () => CityTypeModel], ['ActionType', () => ActionTypeModel], ['SeasonType', () => SeasonTypeModel], ['StaffType', () => StaffTypeModel], ['GMType', () => GmTypeModel], ['CoachType', () => CoachTypeModel], ['RosterType', () => RosterTypeModel], ['PlayerType', () => PlayerTypeModel], ['LeagueMutation', () => LeagueMutationModel], ['PlayerMutation', () => PlayerMutationModel]], ['UserType'], "js"))
  .props({
    userTypes: types.optional(types.map(types.late((): any => UserTypeModel)), {}),
    playerTypes: types.optional(types.map(types.late((): any => PlayerTypeModel)), {})
  })
  .actions(self => ({
    queryAllUser(variables?: {  }, resultSelector: string | ((qb: UserTypeModelSelector) => UserTypeModelSelector) = userTypeModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allUser: UserTypeModelType[]}>(`query allUser { allUser {
        ${typeof resultSelector === "function" ? resultSelector(new UserTypeModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryAllFranchise(variables?: {  }, resultSelector: string | ((qb: FranchiseTypeModelSelector) => FranchiseTypeModelSelector) = franchiseTypeModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allFranchise: FranchiseTypeModelType[]}>(`query allFranchise { allFranchise {
        ${typeof resultSelector === "function" ? resultSelector(new FranchiseTypeModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryAllLeague(variables?: {  }, resultSelector: string | ((qb: LeagueTypeModelSelector) => LeagueTypeModelSelector) = leagueTypeModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allLeague: LeagueTypeModelType[]}>(`query allLeague { allLeague {
        ${typeof resultSelector === "function" ? resultSelector(new LeagueTypeModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryAllCity(variables?: {  }, resultSelector: string | ((qb: CityTypeModelSelector) => CityTypeModelSelector) = cityTypeModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allCity: CityTypeModelType[]}>(`query allCity { allCity {
        ${typeof resultSelector === "function" ? resultSelector(new CityTypeModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryAllStadium(variables?: {  }, resultSelector: string | ((qb: StadiumTypeModelSelector) => StadiumTypeModelSelector) = stadiumTypeModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allStadium: StadiumTypeModelType[]}>(`query allStadium { allStadium {
        ${typeof resultSelector === "function" ? resultSelector(new StadiumTypeModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryAllGm(variables?: {  }, resultSelector: string | ((qb: GmTypeModelSelector) => GmTypeModelSelector) = gmTypeModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allGm: GmTypeModelType[]}>(`query allGm { allGm {
        ${typeof resultSelector === "function" ? resultSelector(new GmTypeModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryAllCoach(variables?: {  }, resultSelector: string | ((qb: CoachTypeModelSelector) => CoachTypeModelSelector) = coachTypeModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allCoach: CoachTypeModelType[]}>(`query allCoach { allCoach {
        ${typeof resultSelector === "function" ? resultSelector(new CoachTypeModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryAllPlayer(variables?: {  }, resultSelector: string | ((qb: PlayerTypeModelSelector) => PlayerTypeModelSelector) = playerTypeModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allPlayer: PlayerTypeModelType[]}>(`query allPlayer { allPlayer {
        ${typeof resultSelector === "function" ? resultSelector(new PlayerTypeModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryAllAction(variables?: {  }, resultSelector: string | ((qb: ActionTypeModelSelector) => ActionTypeModelSelector) = actionTypeModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allAction: ActionTypeModelType[]}>(`query allAction { allAction {
        ${typeof resultSelector === "function" ? resultSelector(new ActionTypeModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryAllSeason(variables?: {  }, resultSelector: string | ((qb: SeasonTypeModelSelector) => SeasonTypeModelSelector) = seasonTypeModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allSeason: SeasonTypeModelType[]}>(`query allSeason { allSeason {
        ${typeof resultSelector === "function" ? resultSelector(new SeasonTypeModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryAllStaff(variables?: {  }, resultSelector: string | ((qb: StaffTypeModelSelector) => StaffTypeModelSelector) = staffTypeModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allStaff: StaffTypeModelType[]}>(`query allStaff { allStaff {
        ${typeof resultSelector === "function" ? resultSelector(new StaffTypeModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryAllRoster(variables?: {  }, resultSelector: string | ((qb: RosterTypeModelSelector) => RosterTypeModelSelector) = rosterTypeModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ allRoster: RosterTypeModelType[]}>(`query allRoster { allRoster {
        ${typeof resultSelector === "function" ? resultSelector(new RosterTypeModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryPlayer(variables?: {  }, resultSelector: string | ((qb: PlayerTypeModelSelector) => PlayerTypeModelSelector) = playerTypeModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ player: PlayerTypeModelType}>(`query player { player {
        ${typeof resultSelector === "function" ? resultSelector(new PlayerTypeModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    mutateUpdateLeague(variables: { leagueName: string }, resultSelector: string | ((qb: LeagueMutationModelSelector) => LeagueMutationModelSelector) = leagueMutationModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ updateLeague: LeagueMutationModelType}>(`mutation updateLeague($leagueName: String!) { updateLeague(leagueName: $leagueName) {
        ${typeof resultSelector === "function" ? resultSelector(new LeagueMutationModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateCreatePlayer(variables: { playerInput: PlayerInput }, resultSelector: string | ((qb: PlayerMutationModelSelector) => PlayerMutationModelSelector) = playerMutationModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createPlayer: PlayerMutationModelType}>(`mutation createPlayer($playerInput: PlayerInput!) { createPlayer(playerInput: $playerInput) {
        ${typeof resultSelector === "function" ? resultSelector(new PlayerMutationModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
  })))
