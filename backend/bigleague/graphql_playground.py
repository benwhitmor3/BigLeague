create_user_mutation = '''
mutation{
  createUser(email: "email@email.com", 
    username: "username", 
    password: "password"){
    message
    user{
      id
      email
      password
    }
  }
}
'''

delete_user_mutation = '''
mutation{
  deleteUser(email: "email@email.com"){
    user{
      id
      email
      password
      username
    }
    message
  }
}
'''

token_auth_mutation = '''
mutation{
    tokenAuth(email: "email@email.com", password: "password"){
        token
        payload
        refreshExpiresIn
    }
}
'''

verify_token_mutation = '''
mutation{
  verifyToken(token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImV4cCI6MTYxOTU3NTIzMCwib3JpZ0lhdCI6MTYxOTU3NDkzMH0.nG6Ajf8lz9-7e9fVjI4pt8WJ6tYH5vRHTDOs2oj5hpc"){
    payload
  }
}
'''

create_league_mutation = '''
mutation{
  createLeague(leagueName: "bigleague", email: "email@email.com"){
    leagueName
      user{
        email
        password
    }
  }
}
'''

create_franchise_mutation = '''
mutation($franchiseInput: FranchiseInput!){
  createFranchise(franchiseInput: $franchiseInput, email: "email@email.com"){
    franchise{
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
      }
    }
    user{
      __typename
      id
      password
      email
      franchise{
        __typename
        id
        franchise
        user{
          __typename
          id
        }
      }
    } 
  }
}
'''

update_franchise_mutation = '''
mutation($franchiseInput: FranchiseInput!){
  updateFranchise(franchiseInput: $franchiseInput){
    franchise{
      id
      franchise
      gm{
        id
        trait
      }
      coach{
        id
        name
      }
    }
  }
}
'''

franchise_input = '''
{
  "franchiseInput": {
    "franchise": "6",
    "gmId": "7",
    "coachId": "11"
  }
}
'''

create_stadium_mutation = '''
mutation($stadiumInput: StadiumInput!) {
  createStadium(stadiumInput: $stadiumInput){
    stadium{
      stadiumName
      seats
      boxes
      grade
      maxGrade
      homeFieldAdvantage
      city{
        city
      }
      franchise{
        franchise
      }
    }
  }
}
'''

update_stadium_mutation = '''
mutation($stadiumInput: StadiumInput!) {
  updateStadium(stadiumInput: $stadiumInput){
    stadium{
      stadiumName
      seats
      boxes
      grade
      maxGrade
      homeFieldAdvantage
      city{
        city
      }
      franchise{
        franchise
      }
    }
  }
}
'''

stadium_input = '''
{
  "stadiumInput": {
    "stadiumName": "STADIUM NAME",
    "seats": 25000,
    "boxes": 250,
    "grade": 20,
    "maxGrade": 20,
    "homeFieldAdvantage": 0,
    "cityId": 58,
    "franchiseId": 64
    }
}
'''

update_player_mutation = '''
mutation($playerInput: PlayerInput!) {
  createPlayer(playerInput: $playerInput){
    player {
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
      lineup
      franchise{
        __typename
        id
        franchise
      }
      league{
        __typename
        id
        leagueName
      }
    }
'''

create_player_variable = '''
{
  "playerInput": {
    "name": "Jay Sloan",
    "suit": "heart",
    "age": 22,
    "pv": 21.213,
    "epv": 21.282,
    "sEpv": 21.221,
    "contract": null,
    "tOption": null,
    "pOption": null,
    "renew": null,
    "salary": null,
    "grade": null,
    "lineup": "starter",
    "franchiseId": "72",
    "trainer": true,
    "leagueId": 7
  }
}
'''

update_action_mutation = '''
mutation($actionInput: ActionInput!) {
  updateAction(actionInput: $actionInput){
  	__typename
    action{
      __typename
      id
      franchise{
        __typename
        id
        user{
          __typename
          id
          franchise{
            __typename
            id
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
         league{
          __typename
          id
          franchiseSet{
            __typename
            id
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
              franchise{
                __typename
                id
              }
            }
          }
        }
          }
        }
      }
    }
  }
}
'''

action_update_variable = '''
{
  "actionInput": {
    "numberOfActions" : 2,
    "improvedBathrooms": true,
    "improvedConcessions": false,
    "jumbotron": false,
    "upscaleBar": false,
   	"hallOfFame": false,
   	"improvedSeating": false,
    "improvedSound": false,
   	"partyDeck": false,
    "wiFi": false,
    "fanNight": false,
    "familyGame": false,
    "doorPrizes": false,
    "mvpNight": false,
   	"paradeOfChampions": false,
    "bribeTheRefs": false,
   	"easyRuns": false,
   	"fanFactor": false,
   	"trainPlayer": 2,
   	"farmSystem": false,
   	"fanFavourites": false,
    "gourmetRestaurant": false,
   	"beerGarden": false,
   	"namingRights": false,
    "eventPlanning": false,
    "franchiseId": "576"
	}
}
'''

roster_create_update_mutation = '''
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
		"playerId": 2,
		"franchiseId": 67,
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
#
# {
#   allUser{
#     id
#     email
#     username
#     franchise{
#       __typename
#       id
#       gm{
#         __typename
#         id
#         trait
#       }
#       coach{
#         __typename
#         id
#         name
#         attributeOne
#         attributeTwo
#       }
# 			stadium{
#         __typename
#         id
#         stadiumName
#         seats
#         boxes
#         grade
#         maxGrade
#         homeFieldAdvantage
#         city{
#           city
#           cityValue
#         }
#       }
#       action{
#         __typename
#         id
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
#       seasonSet{
#         __typename
#         id
#         franchise{
#           __typename
#           id
#         }
#         season
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
#         __typename
#         id
#         player{
#           __typename
#           id
#           name
#           suit
#           age
#           pv
#           epv
#           sEpv
#           contract
#           tOption
#           pOption
#           renew
#           salary
#           grade
#           trainer
#         }
#         franchise{
#           __typename
#           id
#           franchise
#         }
#         lineup
#       }
#       league{
#         __typename
#         id
#         leagueName
#         franchiseSet{
#           __typename
#           id
#           franchise
#           gm{
#             __typename
#             id
#             trait
#           }
#           coach{
#             __typename
#             id
#             name
#             attributeOne
#             attributeTwo
#           }
# 					rosterSet{
#             __typename
#             id
#             player{
#               __typename
#               id
#               name
#               suit
#               age
#               pv
#               epv
#               sEpv
#               contract
#               tOption
#               pOption
#               renew
#               salary
#               grade
#               trainer
#             }
#             lineup
#           }
#         }
#         citySet{
#           __typename
#           id
#           city
#           cityValue
#           league{
#             __typename
#             id
#           }
#           stadiumSet{
#             __typename
#             id
#             stadiumName
#             seats
#             boxes
#             grade
#             maxGrade
#             homeFieldAdvantage
#           }
#         }
#       }
#     }
#   }
# }
