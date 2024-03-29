export const userQuery = `
    __typename
    id
    email
    username
    league{
      __typename
      id
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
        franchise{
            __typename
            id
          }
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
        year
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
        improvedBathroomsComplete
        improvedConcessions
        improvedConcessionsComplete
        jumbotron
        jumbotronComplete
        upscaleBar
        upscaleBarComplete
        hallOfFame
        hallOfFameComplete
        improvedSeating
        improvedSeatingComplete
        improvedSound
        improvedSound
        partyDeck
        partyDeckComplete
        wiFi
        wiFiComplete
        fanNight
        familyGame
        doorPrizes
        mvpNight
        paradeOfChampions
        bribeTheRefs
        easyRuns
        easyRunsComplete
        fanFactor
        fanFactorComplete
        trainPlayer
        farmSystem
        fanFavourites
        gourmetRestaurant
        gourmetRestaurantComplete
        beerGarden
        namingRights
        namingRightsComplete
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
        ticketPrice
        ticketsSold
        boxPrice
        boxesSold
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
            franchise{
            __typename
            id
            }
          }
          action{
            __typename
            id
            numberOfActions
            improvedBathrooms
            improvedBathroomsComplete
            improvedConcessions
            improvedConcessionsComplete
            jumbotron
            jumbotronComplete
            upscaleBar
            upscaleBarComplete
            hallOfFame
            hallOfFameComplete
            improvedSeating
            improvedSeatingComplete
            improvedSound
            improvedSound
            partyDeck
            partyDeckComplete
            wiFi
            wiFiComplete
            fanNight
            familyGame
            doorPrizes
            mvpNight
            paradeOfChampions
            bribeTheRefs
            easyRuns
            easyRunsComplete
            fanFactor
            fanFactorComplete
            trainPlayer
            farmSystem
            fanFavourites
            gourmetRestaurant
            gourmetRestaurantComplete
            beerGarden
            namingRights
            namingRightsComplete
            eventPlanning
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
          year
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
            franchise
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
          ticketPrice
          ticketsSold
          boxPrice
          boxesSold
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
        playerhistorySet{
          __typename
          id
          season
          name
           suit
          age
          pv
          epv
          sEpv
          league{
            __typename
            id
            leagueName
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
          year
          franchise{
            __typename
            id
            franchise
          }
          lineup
        }
        gmSet{
          __typename
          id
          trait
        }
        coachSet{
          __typename
          id
          name
          attributeOne
          attributeTwo
          franchise{
            __typename
            id
          }
        }
      }
    }`;

export const mutateCreatePlayerQuery = `
player {
        league {
            __typename
            id
            leagueName
            franchiseSet {
                __typename
                id
                franchise
                playerSet {
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
                    year
                    franchise {
                        __typename
                        id
                        franchise
                    }
                    lineup
                }
            }
        }
    }
`;