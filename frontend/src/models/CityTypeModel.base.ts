/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { StadiumTypeModel, StadiumTypeModelType } from "./StadiumTypeModel"
import { StadiumTypeModelSelector } from "./StadiumTypeModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  stadiumSet: IObservableArray<StadiumTypeModelType>;
}

/**
 * CityTypeBase
 * auto generated base class for the model CityTypeModel.
 */
export const CityTypeModelBase = withTypedRefs<Refs>()(ModelBase
  .named('CityType')
  .props({
    __typename: types.optional(types.literal("CityType"), "CityType"),
    id: types.identifier,
    city: types.union(types.undefined, types.string),
    cityValue: types.union(types.undefined, types.integer),
    stadiumSet: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => StadiumTypeModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class CityTypeModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get city() { return this.__attr(`city`) }
  get cityValue() { return this.__attr(`cityValue`) }
  stadiumSet(builder?: string | StadiumTypeModelSelector | ((selector: StadiumTypeModelSelector) => StadiumTypeModelSelector)) { return this.__child(`stadiumSet`, StadiumTypeModelSelector, builder) }
}
export function selectFromCityType() {
  return new CityTypeModelSelector()
}

export const cityTypeModelPrimitives = selectFromCityType().city.cityValue
