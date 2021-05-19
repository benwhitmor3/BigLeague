import {Instance, types} from "mobx-state-tree"
import { RootStoreBase } from "./RootStore.base"
import {UserTypeModel} from "./UserTypeModel";
import {FranchiseTypeModel} from "./FranchiseTypeModel";

export interface RootStoreType extends Instance<typeof RootStore.Type> {}

export const RootStore = RootStoreBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    },
  // draft_mutation(player: any, franchiseId: string) {
  //       self.mutateRosterUpdate({
  //       "rosterInput": {
	// 	"playerId": player.id,
	// 	"franchiseId": franchiseId,
  //       "lineup": 'bench'
	//     }
  //     })
  //   }
  }))
  .props({
    User: types.union(
      types.undefined,
      types.null,
      types.reference(types.late((): any => UserTypeModel)),
    ),
  })
  .actions((self) => ({
      setUser(email: string) {
      const query = self.queryUser(
              {email: email},
              `
__typename
    id
    email
    username
    league{
      __typename
      id
      leagueName
    }
    franchise{
      __typename
      id
      gm{
        __typename
        id
        trait
      }
      coach{
        __typename
        id
        name
        attributeOne
        attributeTwo
      }
      stadium{
        __typename
        id
        stadiumName
        seats
        boxes
        grade
        maxGrade
        homeFieldAdvantage
        city{
          __typename
          id
          city
          cityValue
        }
        franchise{
          __typename
          id
          franchise
        }
      }
      playerSet{
        __typename
        id
        name
        suit
        age
        pv
        epv
        sEpv
        contract
        tOption
        pOption
        renew
        salary
        grade
        trainer
        franchise{
          __typename
          id
          franchise
        }
        lineup
      }
      action{
        __typename
        id
        numberOfActions
        improvedBathrooms
        improvedConcessions
        jumbotron
        upscaleBar
        hallOfFame
        improvedSeating
        improvedSound
        partyDeck
        wiFi
        fanNight
        familyGame
        doorPrizes
        mvpNight
        paradeOfChampions
        bribeTheRefs
        easyRuns
        fanFactor
        trainPlayer
        farmSystem
        fanFavourites
        gourmetRestaurant
        beerGarden
        namingRights
        eventPlanning
      }
      stadium{
        __typename
        id
        city{
          __typename
          id
        }
        franchise{
          __typename
          id
        }
        stadiumName
        seats
        boxes
        grade
        maxGrade
        homeFieldAdvantage
      }
      seasonSet{
        __typename
        id
        franchise{
          __typename
          id
        }
        season
        ready
        wins
        losses
        ppg
        std
        championships
        bonuses
        penalties
        fanBase
        fanIndex
        advertising
        revenue
        expenses
      }
      league{
        __typename
        id
        leagueName
        franchiseSet{
          __typename
          id
          franchise
          gm{
            __typename
            id
            trait
          }
          coach{
            __typename
            id
            name
            attributeOne
            attributeTwo
          }
          playerSet{
            __typename
            id
            name
          suit
          age
          pv
          epv
          sEpv
          contract
          tOption
          pOption
          renew
          salary
          grade
          trainer
          franchise{
            __typename
            id
          }
          lineup
          }
        seasonSet{
          __typename
          id
          franchise{
            __typename
            id
          }
          season
          ready
          wins
          losses
          ppg
          std
          championships
          bonuses
          penalties
          fanBase
          fanIndex
          advertising
          revenue
          expenses
        }
        stadium{
          __typename
          id
          stadiumName
          seats
          boxes
          grade
          maxGrade
          homeFieldAdvantage
          city{
            __typename
            id
            city
            cityValue
            }
          }
        }
        citySet{
          __typename
          id
          city
          cityValue
          league{
            __typename
            id
          }
          stadiumSet{
            __typename
            id
            city{
              __typename
              id
            }
            franchise{
              __typename
              id
            }
            stadiumName
            seats
            boxes
            grade
            maxGrade
            homeFieldAdvantage
          }
        }
        playerSet{
          __typename
          id
          name
          suit
          age
          pv
          epv
          sEpv
          contract
          tOption
          pOption
          renew
          salary
          grade
          trainer
          franchise{
            __typename
            id
            franchise
          }
          lineup
        }
        
      }
    }
    `,
      {fetchPolicy: "cache-and-network"},
          ).then((data) => self.User! = self.userTypes!.get(data!.user!.id!))
  return query
      }
  }))


