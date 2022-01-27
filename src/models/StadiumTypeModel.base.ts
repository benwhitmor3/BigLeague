/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { CityTypeModel, CityTypeModelType } from "./CityTypeModel"
import { CityTypeModelSelector } from "./CityTypeModel.base"
import { FranchiseTypeModel, FranchiseTypeModelType } from "./FranchiseTypeModel"
import { FranchiseTypeModelSelector } from "./FranchiseTypeModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  city: CityTypeModelType;
  franchise: FranchiseTypeModelType;
}

/**
 * StadiumTypeBase
 * auto generated base class for the model StadiumTypeModel.
 */
export const StadiumTypeModelBase = withTypedRefs<Refs>()(ModelBase
  .named('StadiumType')
  .props({
    __typename: types.optional(types.literal("StadiumType"), "StadiumType"),
    id: types.identifier,
    stadiumName: types.union(types.undefined, types.string),
    seats: types.union(types.undefined, types.integer),
    boxes: types.union(types.undefined, types.integer),
    grade: types.union(types.undefined, types.integer),
    maxGrade: types.union(types.undefined, types.integer),
    homeFieldAdvantage: types.union(types.undefined, types.integer),
    city: types.union(types.undefined, MSTGQLRef(types.late((): any => CityTypeModel))),
    franchise: types.union(types.undefined, MSTGQLRef(types.late((): any => FranchiseTypeModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class StadiumTypeModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get stadiumName() { return this.__attr(`stadiumName`) }
  get seats() { return this.__attr(`seats`) }
  get boxes() { return this.__attr(`boxes`) }
  get grade() { return this.__attr(`grade`) }
  get maxGrade() { return this.__attr(`maxGrade`) }
  get homeFieldAdvantage() { return this.__attr(`homeFieldAdvantage`) }
  city(builder?: string | CityTypeModelSelector | ((selector: CityTypeModelSelector) => CityTypeModelSelector)) { return this.__child(`city`, CityTypeModelSelector, builder) }
  franchise(builder?: string | FranchiseTypeModelSelector | ((selector: FranchiseTypeModelSelector) => FranchiseTypeModelSelector)) { return this.__child(`franchise`, FranchiseTypeModelSelector, builder) }
}
export function selectFromStadiumType() {
  return new StadiumTypeModelSelector()
}

export const stadiumTypeModelPrimitives = selectFromStadiumType().stadiumName.seats.boxes.grade.maxGrade.homeFieldAdvantage
