/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { FranchiseTypeModel, FranchiseTypeModelType } from "./FranchiseTypeModel"
import { FranchiseTypeModelSelector } from "./FranchiseTypeModel.base"
import { LeagueTypeModel, LeagueTypeModelType } from "./LeagueTypeModel"
import { LeagueTypeModelSelector } from "./LeagueTypeModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  franchise: FranchiseTypeModelType;
  league: LeagueTypeModelType;
}

/**
 * PlayerTypeBase
 * auto generated base class for the model PlayerTypeModel.
 */
export const PlayerTypeModelBase = withTypedRefs<Refs>()(ModelBase
  .named('PlayerType')
  .props({
    __typename: types.optional(types.literal("PlayerType"), "PlayerType"),
    id: types.identifier,
    name: types.union(types.undefined, types.string),
    suit: types.union(types.undefined, types.string),
    age: types.union(types.undefined, types.integer),
    pv: types.union(types.undefined, types.number),
    epv: types.union(types.undefined, types.number),
    sEpv: types.union(types.undefined, types.number),
    contract: types.union(types.undefined, types.null, types.integer),
    tOption: types.union(types.undefined, types.null, types.integer),
    pOption: types.union(types.undefined, types.null, types.integer),
    renew: types.union(types.undefined, types.null, types.string),
    salary: types.union(types.undefined, types.null, types.number),
    grade: types.union(types.undefined, types.null, types.number),
    trainer: types.union(types.undefined, types.boolean),
    lineup: types.union(types.undefined, types.null, types.string),
    franchise: types.union(types.undefined, types.null, MSTGQLRef(types.late((): any => FranchiseTypeModel))),
    league: types.union(types.undefined, MSTGQLRef(types.late((): any => LeagueTypeModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class PlayerTypeModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get suit() { return this.__attr(`suit`) }
  get age() { return this.__attr(`age`) }
  get pv() { return this.__attr(`pv`) }
  get epv() { return this.__attr(`epv`) }
  get sEpv() { return this.__attr(`sEpv`) }
  get contract() { return this.__attr(`contract`) }
  get tOption() { return this.__attr(`tOption`) }
  get pOption() { return this.__attr(`pOption`) }
  get renew() { return this.__attr(`renew`) }
  get salary() { return this.__attr(`salary`) }
  get grade() { return this.__attr(`grade`) }
  get trainer() { return this.__attr(`trainer`) }
  get lineup() { return this.__attr(`lineup`) }
  franchise(builder?: string | FranchiseTypeModelSelector | ((selector: FranchiseTypeModelSelector) => FranchiseTypeModelSelector)) { return this.__child(`franchise`, FranchiseTypeModelSelector, builder) }
  league(builder?: string | LeagueTypeModelSelector | ((selector: LeagueTypeModelSelector) => LeagueTypeModelSelector)) { return this.__child(`league`, LeagueTypeModelSelector, builder) }
}
export function selectFromPlayerType() {
  return new PlayerTypeModelSelector()
}

export const playerTypeModelPrimitives = selectFromPlayerType().name.suit.age.pv.epv.sEpv.contract.tOption.pOption.renew.salary.grade.trainer.lineup
