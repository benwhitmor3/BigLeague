/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { FranchiseTypeModel, FranchiseTypeModelType } from "./FranchiseTypeModel"
import { FranchiseTypeModelSelector } from "./FranchiseTypeModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  franchise: FranchiseTypeModelType;
}

/**
 * ActionTypeBase
 * auto generated base class for the model ActionTypeModel.
 */
export const ActionTypeModelBase = withTypedRefs<Refs>()(ModelBase
  .named('ActionType')
  .props({
    __typename: types.optional(types.literal("ActionType"), "ActionType"),
    id: types.identifier,
    franchise: types.union(types.undefined, MSTGQLRef(types.late((): any => FranchiseTypeModel))),
    numberOfActions: types.union(types.undefined, types.integer),
    improvedBathrooms: types.union(types.undefined, types.boolean),
    improvedBathroomsComplete: types.union(types.undefined, types.boolean),
    improvedConcessions: types.union(types.undefined, types.boolean),
    improvedConcessionsComplete: types.union(types.undefined, types.boolean),
    jumbotron: types.union(types.undefined, types.boolean),
    jumbotronComplete: types.union(types.undefined, types.boolean),
    upscaleBar: types.union(types.undefined, types.boolean),
    upscaleBarComplete: types.union(types.undefined, types.boolean),
    hallOfFame: types.union(types.undefined, types.boolean),
    hallOfFameComplete: types.union(types.undefined, types.boolean),
    improvedSeating: types.union(types.undefined, types.boolean),
    improvedSeatingComplete: types.union(types.undefined, types.boolean),
    improvedSound: types.union(types.undefined, types.boolean),
    improvedSoundComplete: types.union(types.undefined, types.boolean),
    partyDeck: types.union(types.undefined, types.boolean),
    partyDeckComplete: types.union(types.undefined, types.boolean),
    wiFi: types.union(types.undefined, types.boolean),
    wiFiComplete: types.union(types.undefined, types.boolean),
    fanNight: types.union(types.undefined, types.boolean),
    familyGame: types.union(types.undefined, types.boolean),
    doorPrizes: types.union(types.undefined, types.boolean),
    mvpNight: types.union(types.undefined, types.boolean),
    paradeOfChampions: types.union(types.undefined, types.boolean),
    bribeTheRefs: types.union(types.undefined, types.boolean),
    easyRuns: types.union(types.undefined, types.boolean),
    easyRunsComplete: types.union(types.undefined, types.boolean),
    fanFactor: types.union(types.undefined, types.boolean),
    fanFactorComplete: types.union(types.undefined, types.boolean),
    trainPlayer: types.union(types.undefined, types.integer),
    farmSystem: types.union(types.undefined, types.boolean),
    fanFavourites: types.union(types.undefined, types.boolean),
    gourmetRestaurant: types.union(types.undefined, types.boolean),
    gourmetRestaurantComplete: types.union(types.undefined, types.boolean),
    beerGarden: types.union(types.undefined, types.boolean),
    namingRights: types.union(types.undefined, types.boolean),
    namingRightsComplete: types.union(types.undefined, types.boolean),
    eventPlanning: types.union(types.undefined, types.boolean),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class ActionTypeModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get numberOfActions() { return this.__attr(`numberOfActions`) }
  get improvedBathrooms() { return this.__attr(`improvedBathrooms`) }
  get improvedBathroomsComplete() { return this.__attr(`improvedBathroomsComplete`) }
  get improvedConcessions() { return this.__attr(`improvedConcessions`) }
  get improvedConcessionsComplete() { return this.__attr(`improvedConcessionsComplete`) }
  get jumbotron() { return this.__attr(`jumbotron`) }
  get jumbotronComplete() { return this.__attr(`jumbotronComplete`) }
  get upscaleBar() { return this.__attr(`upscaleBar`) }
  get upscaleBarComplete() { return this.__attr(`upscaleBarComplete`) }
  get hallOfFame() { return this.__attr(`hallOfFame`) }
  get hallOfFameComplete() { return this.__attr(`hallOfFameComplete`) }
  get improvedSeating() { return this.__attr(`improvedSeating`) }
  get improvedSeatingComplete() { return this.__attr(`improvedSeatingComplete`) }
  get improvedSound() { return this.__attr(`improvedSound`) }
  get improvedSoundComplete() { return this.__attr(`improvedSoundComplete`) }
  get partyDeck() { return this.__attr(`partyDeck`) }
  get partyDeckComplete() { return this.__attr(`partyDeckComplete`) }
  get wiFi() { return this.__attr(`wiFi`) }
  get wiFiComplete() { return this.__attr(`wiFiComplete`) }
  get fanNight() { return this.__attr(`fanNight`) }
  get familyGame() { return this.__attr(`familyGame`) }
  get doorPrizes() { return this.__attr(`doorPrizes`) }
  get mvpNight() { return this.__attr(`mvpNight`) }
  get paradeOfChampions() { return this.__attr(`paradeOfChampions`) }
  get bribeTheRefs() { return this.__attr(`bribeTheRefs`) }
  get easyRuns() { return this.__attr(`easyRuns`) }
  get easyRunsComplete() { return this.__attr(`easyRunsComplete`) }
  get fanFactor() { return this.__attr(`fanFactor`) }
  get fanFactorComplete() { return this.__attr(`fanFactorComplete`) }
  get trainPlayer() { return this.__attr(`trainPlayer`) }
  get farmSystem() { return this.__attr(`farmSystem`) }
  get fanFavourites() { return this.__attr(`fanFavourites`) }
  get gourmetRestaurant() { return this.__attr(`gourmetRestaurant`) }
  get gourmetRestaurantComplete() { return this.__attr(`gourmetRestaurantComplete`) }
  get beerGarden() { return this.__attr(`beerGarden`) }
  get namingRights() { return this.__attr(`namingRights`) }
  get namingRightsComplete() { return this.__attr(`namingRightsComplete`) }
  get eventPlanning() { return this.__attr(`eventPlanning`) }
  franchise(builder?: string | FranchiseTypeModelSelector | ((selector: FranchiseTypeModelSelector) => FranchiseTypeModelSelector)) { return this.__child(`franchise`, FranchiseTypeModelSelector, builder) }
}
export function selectFromActionType() {
  return new ActionTypeModelSelector()
}

export const actionTypeModelPrimitives = selectFromActionType().numberOfActions.improvedBathrooms.improvedBathroomsComplete.improvedConcessions.improvedConcessionsComplete.jumbotron.jumbotronComplete.upscaleBar.upscaleBarComplete.hallOfFame.hallOfFameComplete.improvedSeating.improvedSeatingComplete.improvedSound.improvedSoundComplete.partyDeck.partyDeckComplete.wiFi.wiFiComplete.fanNight.familyGame.doorPrizes.mvpNight.paradeOfChampions.bribeTheRefs.easyRuns.easyRunsComplete.fanFactor.fanFactorComplete.trainPlayer.farmSystem.fanFavourites.gourmetRestaurant.gourmetRestaurantComplete.beerGarden.namingRights.namingRightsComplete.eventPlanning
