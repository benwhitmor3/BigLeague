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
    user{
      password
      email
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
    "gm": "7",
    "coach": "11"
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
    "city": 58,
    "franchise": 64
    }
}
'''



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
		"player": 2,
		"franchise": 67,
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
