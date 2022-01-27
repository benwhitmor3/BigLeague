import { Instance } from "mobx-state-tree"
import { CityTypeModelBase } from "./CityTypeModel.base"

/* The TypeScript type of an instance of CityTypeModel */
export interface CityTypeModelType extends Instance<typeof CityTypeModel.Type> {}

/* A graphql query fragment builders for CityTypeModel */
export { selectFromCityType, cityTypeModelPrimitives, CityTypeModelSelector } from "./CityTypeModel.base"

/**
 * CityTypeModel
 */
export const CityTypeModel = CityTypeModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
