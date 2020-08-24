import { Instance } from "mobx-state-tree"
import { LeagueTypeModelBase } from "./LeagueTypeModel.base"

/* The TypeScript type of an instance of LeagueTypeModel */
export interface LeagueTypeModelType extends Instance<typeof LeagueTypeModel.Type> {}

/* A graphql query fragment builders for LeagueTypeModel */
export { selectFromLeagueType, leagueTypeModelPrimitives, LeagueTypeModelSelector } from "./LeagueTypeModel.base"

/**
 * LeagueTypeModel
 */
export const LeagueTypeModel = LeagueTypeModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
