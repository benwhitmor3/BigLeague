import graphene
from bigleague.schema import Query, Mutation


class Query(Query):
    pass


class Mutation(Mutation):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)

# schema.execute(
#     '''
#     mutation myFirstMutation {
#     createPlayer(playerData: {name: "Gary Graphene", suit: "Diamond", age: 25, pv: 23.34567, epv: 23.34567,
#     sEpv: 23.34567})
#      {
#         player {
#         name,
#         suit,
#         age,
#         pv,
#         epv,
#         sEpv
#         }
#     }
# }
# '''
# )
