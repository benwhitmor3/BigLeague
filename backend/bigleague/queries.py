
create_player = '''
mutation myFirstMutation {
    createPlayer(playerInput: {name: "Gareth Graphene", suit: "diamond", age: 25, pv: 23.34567, epv: 23.34567, 
    sEpv: 23.34567}) {
        player {
        name, 
        suit,
        age,
        pv,
        epv,
        sEpv
        }
    }
}
'''


query_all_players = '''
{
  allPlayer {
    name
  }
}
'''

query_all_league = '''
{
  allLeague{
    leagueName
    franchise{
      franchise
      username{
        username
      }
    }
    playerSet {
      contract
      tOption
      pOption
      renew
      salary
      grade
    }
  }
}
'''


# {
#   allUser{
#     username
#     franchise{
# 			franchise
#       leagueSet{
#         leagueName
#       }
#       staff{
#         gm{
#           trait
#         }
#         coach{
#           name
#           attributeOne
#           attributeTwo
#         }
#       }
#       action{
#         numberOfActions
#         improvedBathrooms
#         improvedConcessions
#         jumbotron
#         upscaleBar
#         hallOfFame
#         improvedSeating
#         improvedSound
#         partyDeck
#         wiFi
#         fanNight
#         familyGame
#         doorPrizes
#         mvpNight
#         paradeOfChampions
#         bribeTheRefs
#         easyRuns
#         fanFactor
#         trainPlayer
#         farmSystem
#         fanFavourites
#         gourmetRestaurant
#         beerGarden
#         namingRights
#         eventPlanning
#       }
#       stadium{
#         stadiumName
#         seats
#         boxes
#         grade
#         maxGrade
#         homeFieldAdvantage
#         city {
#           city
#           cityValue
#         }
#         franchise{
#           franchise
#         }
#       }
#       season{
#         ready
#         wins
#         losses
#         ppg
#         std
#         championships
#         bonuses
#         penalties
#         fanBase
#         fanIndex
#         advertising
#         revenue
#         expenses
#       }
#       rosterSet{
#         player {
#           contract
#           tOption
#           pOption
#           renew
#           salary
#           grade
#         }
#         lineup
#       }
#     }
#   }
# }
