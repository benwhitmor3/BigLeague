/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { LeagueTypeModel, LeagueTypeModelType } from "./LeagueTypeModel"
import { LeagueTypeModelSelector } from "./LeagueTypeModel.base"
import { RootStoreType } from "./index"


/**
 * LeagueMutationBase
 * auto generated base class for the model LeagueMutationModel.
 */
export const LeagueMutationModelBase = ModelBase
  .named('LeagueMutation')
  .props({
    __typename: types.optional(types.literal("LeagueMutation"), "LeagueMutation"),
    leagueName: types.union(types.undefined, types.null, types.late((): any => LeagueTypeModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class LeagueMutationModelSelector extends QueryBuilder {
  leagueName(builder?: string | LeagueTypeModelSelector | ((selector: LeagueTypeModelSelector) => LeagueTypeModelSelector)) { return this.__child(`leagueName`, LeagueTypeModelSelector, builder) }
}
export function selectFromLeagueMutation() {
  return new LeagueMutationModelSelector()
}

export const leagueMutationModelPrimitives = selectFromLeagueMutation()
