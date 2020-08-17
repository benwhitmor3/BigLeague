
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
ß