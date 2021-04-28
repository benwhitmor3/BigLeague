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
import { GmTypeModel, GmTypeModelType } from "./GmTypeModel"
import { gmTypeModelPrimitives, GmTypeModelSelector } from "./GmTypeModel.base"
import { CoachTypeModel, CoachTypeModelType } from "./CoachTypeModel"
import { coachTypeModelPrimitives, CoachTypeModelSelector } from "./CoachTypeModel.base"
import { PlayerTypeModel, PlayerTypeModelType } from "./PlayerTypeModel"
import { playerTypeModelPrimitives, PlayerTypeModelSelector } from "./PlayerTypeModel.base"
import { RosterTypeModel, RosterTypeModelType } from "./RosterTypeModel"
import { rosterTypeModelPrimitives, RosterTypeModelSelector } from "./RosterTypeModel.base"
import { StadiumTypeModel, StadiumTypeModelType } from "./StadiumTypeModel"
import { stadiumTypeModelPrimitives, StadiumTypeModelSelector } from "./StadiumTypeModel.base"
import { CityTypeModel, CityTypeModelType } from "./CityTypeModel"
import { cityTypeModelPrimitives, CityTypeModelSelector } from "./CityTypeModel.base"
import { ActionTypeModel, ActionTypeModelType } from "./ActionTypeModel"
import { actionTypeModelPrimitives, ActionTypeModelSelector } from "./ActionTypeModel.base"
import { SeasonTypeModel, SeasonTypeModelType } from "./SeasonTypeModel"
import { seasonTypeModelPrimitives, SeasonTypeModelSelector } from "./SeasonTypeModel.base"
import { LeagueMutationModel, LeagueMutationModelType } from "./LeagueMutationModel"
import { leagueMutationModelPrimitives, LeagueMutationModelSelector } from "./LeagueMutationModel.base"
import { PlayerMutationModel, PlayerMutationModelType } from "./PlayerMutationModel"
import { playerMutationModelPrimitives, PlayerMutationModelSelector } from "./PlayerMutationModel.base"
import { RosterMutationModel, RosterMutationModelType } from "./RosterMutationModel"
import { rosterMutationModelPrimitives, RosterMutationModelSelector } from "./RosterMutationModel.base"
import { StadiumMutationModel, StadiumMutationModelType } from "./StadiumMutationModel"
import { stadiumMutationModelPrimitives, StadiumMutationModelSelector } from "./StadiumMutationModel.base"
import { CreateUserModel, CreateUserModelType } from "./CreateUserModel"
import { createUserModelPrimitives, CreateUserModelSelector } from "./CreateUserModel.base"
import { ObtainJsonWebTokenModel, ObtainJsonWebTokenModelType } from "./ObtainJsonWebTokenModel"
import { obtainJsonWebTokenModelPrimitives, ObtainJsonWebTokenModelSelector } from "./ObtainJsonWebTokenModel.base"
import { VerifyModel, VerifyModelType } from "./VerifyModel"
import { verifyModelPrimitives, VerifyModelSelector } from "./VerifyModel.base"
import { RefreshModel, RefreshModelType } from "./RefreshModel"
import { refreshModelPrimitives, RefreshModelSelector } from "./RefreshModel.base"


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
  contract?: number
  tOption?: number
  pOption?: number
  renew?: string
  salary?: number
  grade?: number
  trainer?: boolean
  leagueName: string
}
export type RosterInput = {
  playerName?: string
  franchiseFranchise?: string
  lineup?: string
}
export type StadiumInput = {
  stadiumName?: string
  seats?: number
  boxes?: number
  grade?: number
  maxGrade?: number
  homeFieldAdvantage?: number
  city?: string
  franchise?: string
}
/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  userTypes: ObservableMap<string, UserTypeModelType>,
  franchiseTypes: ObservableMap<string, FranchiseTypeModelType>,
  leagueTypes: ObservableMap<string, LeagueTypeModelType>,
  gmTypes: ObservableMap<string, GmTypeModelType>,
  coachTypes: ObservableMap<string, CoachTypeModelType>,
  playerTypes: ObservableMap<string, PlayerTypeModelType>,
  rosterTypes: ObservableMap<string, RosterTypeModelType>,
  stadiumTypes: ObservableMap<string, StadiumTypeModelType>,
  cityTypes: ObservableMap<string, CityTypeModelType>,
  actionTypes: ObservableMap<string, ActionTypeModelType>,
  seasonTypes: ObservableMap<string, SeasonTypeModelType>
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
queryAllRoster="queryAllRoster",
queryPlayer="queryPlayer",
queryRoster="queryRoster",
queryUser="queryUser",
queryLeague="queryLeague"
}
export enum RootStoreBaseMutations {
mutateUpdateLeague="mutateUpdateLeague",
mutateCreatePlayer="mutateCreatePlayer",
mutateRosterUpdate="mutateRosterUpdate",
mutateCreateStadium="mutateCreateStadium",
mutateCreateUser="mutateCreateUser",
mutateTokenAuth="mutateTokenAuth",
mutateVerifyToken="mutateVerifyToken",
mutateRefreshToken="mutateRefreshToken"
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['UserType', () => UserTypeModel], ['FranchiseType', () => FranchiseTypeModel], ['LeagueType', () => LeagueTypeModel], ['GMType', () => GmTypeModel], ['CoachType', () => CoachTypeModel], ['PlayerType', () => PlayerTypeModel], ['RosterType', () => RosterTypeModel], ['StadiumType', () => StadiumTypeModel], ['CityType', () => CityTypeModel], ['ActionType', () => ActionTypeModel], ['SeasonType', () => SeasonTypeModel], ['LeagueMutation', () => LeagueMutationModel], ['PlayerMutation', () => PlayerMutationModel], ['RosterMutation', () => RosterMutationModel], ['StadiumMutation', () => StadiumMutationModel], ['CreateUser', () => CreateUserModel], ['ObtainJSONWebToken', () => ObtainJsonWebTokenModel], ['Verify', () => VerifyModel], ['Refresh', () => RefreshModel]], ['UserType', 'FranchiseType', 'LeagueType', 'GMType', 'CoachType', 'PlayerType', 'RosterType', 'StadiumType', 'CityType', 'ActionType', 'SeasonType'], "js"))
  .props({
    userTypes: types.optional(types.map(types.late((): any => UserTypeModel)), {}),
    franchiseTypes: types.optional(types.map(types.late((): any => FranchiseTypeModel)), {}),
    leagueTypes: types.optional(types.map(types.late((): any => LeagueTypeModel)), {}),
    gmTypes: types.optional(types.map(types.late((): any => GmTypeModel)), {}),
    coachTypes: types.optional(types.map(types.late((): any => CoachTypeModel)), {}),
    playerTypes: types.optional(types.map(types.late((): any => PlayerTypeModel)), {}),
    rosterTypes: types.optional(types.map(types.late((): any => RosterTypeModel)), {}),
    stadiumTypes: types.optional(types.map(types.late((): any => StadiumTypeModel)), {}),
    cityTypes: types.optional(types.map(types.late((): any => CityTypeModel)), {}),
    actionTypes: types.optional(types.map(types.late((): any => ActionTypeModel)), {}),
    seasonTypes: types.optional(types.map(types.late((): any => SeasonTypeModel)), {})
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
    queryRoster(variables?: {  }, resultSelector: string | ((qb: RosterTypeModelSelector) => RosterTypeModelSelector) = rosterTypeModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ roster: RosterTypeModelType}>(`query roster { roster {
        ${typeof resultSelector === "function" ? resultSelector(new RosterTypeModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryUser(variables: { email?: string }, resultSelector: string | ((qb: UserTypeModelSelector) => UserTypeModelSelector) = userTypeModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ user: UserTypeModelType}>(`query user($email: String) { user(email: $email) {
        ${typeof resultSelector === "function" ? resultSelector(new UserTypeModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryLeague(variables: { leagueName?: string }, resultSelector: string | ((qb: LeagueTypeModelSelector) => LeagueTypeModelSelector) = leagueTypeModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ league: LeagueTypeModelType}>(`query league($leagueName: String) { league(leagueName: $leagueName) {
        ${typeof resultSelector === "function" ? resultSelector(new LeagueTypeModelSelector()).toString() : resultSelector}
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
    mutateRosterUpdate(variables: { rosterInput: RosterInput }, resultSelector: string | ((qb: RosterMutationModelSelector) => RosterMutationModelSelector) = rosterMutationModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ rosterUpdate: RosterMutationModelType}>(`mutation rosterUpdate($rosterInput: RosterInput!) { rosterUpdate(rosterInput: $rosterInput) {
        ${typeof resultSelector === "function" ? resultSelector(new RosterMutationModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateCreateStadium(variables: { stadiumInput: StadiumInput }, resultSelector: string | ((qb: StadiumMutationModelSelector) => StadiumMutationModelSelector) = stadiumMutationModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createStadium: StadiumMutationModelType}>(`mutation createStadium($stadiumInput: StadiumInput!) { createStadium(stadiumInput: $stadiumInput) {
        ${typeof resultSelector === "function" ? resultSelector(new StadiumMutationModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateCreateUser(variables: { email: string, password: string, username?: string }, resultSelector: string | ((qb: CreateUserModelSelector) => CreateUserModelSelector) = createUserModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createUser: CreateUserModelType}>(`mutation createUser($email: String!, $password: String!, $username: String) { createUser(email: $email, password: $password, username: $username) {
        ${typeof resultSelector === "function" ? resultSelector(new CreateUserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // Obtain JSON Web Token mutation
    mutateTokenAuth(variables: { email: string, password: string }, resultSelector: string | ((qb: ObtainJsonWebTokenModelSelector) => ObtainJsonWebTokenModelSelector) = obtainJsonWebTokenModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ tokenAuth: ObtainJsonWebTokenModelType}>(`mutation tokenAuth($email: String!, $password: String!) { tokenAuth(email: $email, password: $password) {
        ${typeof resultSelector === "function" ? resultSelector(new ObtainJsonWebTokenModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateVerifyToken(variables: { token?: string }, resultSelector: string | ((qb: VerifyModelSelector) => VerifyModelSelector) = verifyModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ verifyToken: VerifyModelType}>(`mutation verifyToken($token: String) { verifyToken(token: $token) {
        ${typeof resultSelector === "function" ? resultSelector(new VerifyModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateRefreshToken(variables: { token?: string }, resultSelector: string | ((qb: RefreshModelSelector) => RefreshModelSelector) = refreshModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ refreshToken: RefreshModelType}>(`mutation refreshToken($token: String) { refreshToken(token: $token) {
        ${typeof resultSelector === "function" ? resultSelector(new RefreshModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
  })))
