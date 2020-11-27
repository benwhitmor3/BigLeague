create_player_mutation = '''
mutation($playerInput: PlayerInput!) {
  createPlayer(playerInput: $playerInput){
  	player {
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
      league{
        leagueName
      }
    }
  }	
}
'''

create_player_variable = '''
{
  "playerInput": {
    "name": "gary graphene",
    "suit": "diamond",
    "age": 22,
    "pv": 21.213,
    "epv": 21.964,
    "sEpv": 21.221,
    "trainer": true,
    "leagueName": "bigleague"
  }
}
'''

roster_update_mutation = '''
mutation($rosterInput: RosterInput!) {
  rosterUpdate(rosterInput: $rosterInput){
	roster{
    player{
      name
    }
    franchise{
      franchise
    }
    lineup
  }
  }
}
'''

roster_update_variable = '''
{
  "rosterInput": {
		"playerName": "gary graphene",
		"franchiseFranchise": "franchise",
    "lineup": "starter"
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
