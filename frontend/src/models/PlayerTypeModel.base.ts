/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PlayerLineupEnumType } from "./PlayerLineupEnum"
import { PlayerRenewEnumType } from "./PlayerRenewEnum"
import { PlayerSuitEnumType } from "./PlayerSuitEnum"
import { RosterTypeModel, RosterTypeModelType } from "./RosterTypeModel"
import { RosterTypeModelSelector } from "./RosterTypeModel.base"
import { RootStoreType } from "./index"


/**
 * PlayerTypeBase
 * auto generated base class for the model PlayerTypeModel.
 */
export const PlayerTypeModelBase = ModelBase
  .named('PlayerType')
  .props({
    __typename: types.optional(types.literal("PlayerType"), "PlayerType"),
    name: types.union(types.undefined, types.string),
    suit: types.union(types.undefined, PlayerSuitEnumType),
    age: types.union(types.undefined, types.integer),
    pv: types.union(types.undefined, types.number),
    epv: types.union(types.undefined, types.number),
    sEpv: types.union(types.undefined, types.number),
    contract: types.union(types.undefined, types.null, types.integer),
    tOption: types.union(types.undefined, types.null, types.integer),
    pOption: types.union(types.undefined, types.null, types.integer),
    renew: types.union(types.undefined, PlayerRenewEnumType),
    salary: types.union(types.undefined, types.null, types.number),
    grade: types.union(types.undefined, types.null, types.number),
    lineup: types.union(types.undefined, PlayerLineupEnumType),
    trainer: types.union(types.undefined, types.boolean),
    roster: types.union(types.undefined, types.null, types.late((): any => RosterTypeModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PlayerTypeModelSelector extends QueryBuilder {
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
  get lineup() { return this.__attr(`lineup`) }
  get trainer() { return this.__attr(`trainer`) }
  roster(builder?: string | RosterTypeModelSelector | ((selector: RosterTypeModelSelector) => RosterTypeModelSelector)) { return this.__child(`roster`, RosterTypeModelSelector, builder) }
}
export function selectFromPlayerType() {
  return new PlayerTypeModelSelector()
}

export const playerTypeModelPrimitives = selectFromPlayerType().name.suit.age.pv.epv.sEpv.contract.tOption.pOption.renew.salary.grade.lineup.trainer
