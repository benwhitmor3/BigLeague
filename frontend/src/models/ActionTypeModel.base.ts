/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { FranchiseTypeModel, FranchiseTypeModelType } from "./FranchiseTypeModel"
import { FranchiseTypeModelSelector } from "./FranchiseTypeModel.base"
import { RootStoreType } from "./index"


/**
 * ActionTypeBase
 * auto generated base class for the model ActionTypeModel.
 */
export const ActionTypeModelBase = ModelBase
  .named('ActionType')
  .props({
    __typename: types.optional(types.literal("ActionType"), "ActionType"),
    franchise: types.union(types.undefined, types.late((): any => FranchiseTypeModel)),
    numberOfActions: types.union(types.undefined, types.integer),
    improvedBathrooms: types.union(types.undefined, types.boolean),
    improvedConcessions: types.union(types.undefined, types.boolean),
    jumbotron: types.union(types.undefined, types.boolean),
    upscaleBar: types.union(types.undefined, types.boolean),
    hallOfFame: types.union(types.undefined, types.boolean),
    improvedSeating: types.union(types.undefined, types.boolean),
    improvedSound: types.union(types.undefined, types.boolean),
    partyDeck: types.union(types.undefined, types.boolean),
    wiFi: types.union(types.undefined, types.boolean),
    fanNight: types.union(types.undefined, types.boolean),
    familyGame: types.union(types.undefined, types.boolean),
    doorPrizes: types.union(types.undefined, types.boolean),
    mvpNight: types.union(types.undefined, types.boolean),
    paradeOfChampions: types.union(types.undefined, types.boolean),
    bribeTheRefs: types.union(types.undefined, types.boolean),
    easyRuns: types.union(types.undefined, types.boolean),
    fanFactor: types.union(types.undefined, types.boolean),
    trainPlayer: types.union(types.undefined, types.integer),
    farmSystem: types.union(types.undefined, types.boolean),
    fanFavourites: types.union(types.undefined, types.boolean),
    gourmetRestaurant: types.union(types.undefined, types.boolean),
    beerGarden: types.union(types.undefined, types.boolean),
    namingRights: types.union(types.undefined, types.boolean),
    eventPlanning: types.union(types.undefined, types.boolean),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ActionTypeModelSelector extends QueryBuilder {
  get numberOfActions() { return this.__attr(`numberOfActions`) }
  get improvedBathrooms() { return this.__attr(`improvedBathrooms`) }
  get improvedConcessions() { return this.__attr(`improvedConcessions`) }
  get jumbotron() { return this.__attr(`jumbotron`) }
  get upscaleBar() { return this.__attr(`upscaleBar`) }
  get hallOfFame() { return this.__attr(`hallOfFame`) }
  get improvedSeating() { return this.__attr(`improvedSeating`) }
  get improvedSound() { return this.__attr(`improvedSound`) }
  get partyDeck() { return this.__attr(`partyDeck`) }
  get wiFi() { return this.__attr(`wiFi`) }
  get fanNight() { return this.__attr(`fanNight`) }
  get familyGame() { return this.__attr(`familyGame`) }
  get doorPrizes() { return this.__attr(`doorPrizes`) }
  get mvpNight() { return this.__attr(`mvpNight`) }
  get paradeOfChampions() { return this.__attr(`paradeOfChampions`) }
  get bribeTheRefs() { return this.__attr(`bribeTheRefs`) }
  get easyRuns() { return this.__attr(`easyRuns`) }
  get fanFactor() { return this.__attr(`fanFactor`) }
  get trainPlayer() { return this.__attr(`trainPlayer`) }
  get farmSystem() { return this.__attr(`farmSystem`) }
  get fanFavourites() { return this.__attr(`fanFavourites`) }
  get gourmetRestaurant() { return this.__attr(`gourmetRestaurant`) }
  get beerGarden() { return this.__attr(`beerGarden`) }
  get namingRights() { return this.__attr(`namingRights`) }
  get eventPlanning() { return this.__attr(`eventPlanning`) }
  franchise(builder?: string | FranchiseTypeModelSelector | ((selector: FranchiseTypeModelSelector) => FranchiseTypeModelSelector)) { return this.__child(`franchise`, FranchiseTypeModelSelector, builder) }
}
export function selectFromActionType() {
  return new ActionTypeModelSelector()
}

export const actionTypeModelPrimitives = selectFromActionType().numberOfActions.improvedBathrooms.improvedConcessions.jumbotron.upscaleBar.hallOfFame.improvedSeating.improvedSound.partyDeck.wiFi.fanNight.familyGame.doorPrizes.mvpNight.paradeOfChampions.bribeTheRefs.easyRuns.fanFactor.trainPlayer.farmSystem.fanFavourites.gourmetRestaurant.beerGarden.namingRights.eventPlanning
