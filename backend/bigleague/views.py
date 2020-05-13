from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CitiesSerializer, TeamsSerializer, PlayersSerializer, GMsSerializer, CoachesSerializer, \
    SeasonsSerializer, \
    UserSerializer, UserSerializerWithToken
from .models import Cities, Teams, Players, GMs, Coaches, Seasons


# Create your views here.
class CitiesView(viewsets.ModelViewSet):
    queryset = Cities.objects.all()
    serializer_class = CitiesSerializer


class TeamsView(viewsets.ModelViewSet):
    queryset = Teams.objects.all()
    serializer_class = TeamsSerializer


class PlayersView(viewsets.ModelViewSet):
    queryset = Players.objects.all()
    serializer_class = PlayersSerializer


class GMsView(viewsets.ModelViewSet):
    queryset = GMs.objects.all()
    serializer_class = GMsSerializer


class CoachesView(viewsets.ModelViewSet):
    queryset = Coaches.objects.all()
    serializer_class = CoachesSerializer


class SeasonsView(viewsets.ModelViewSet):
    queryset = Seasons.objects.all()
    serializer_class = SeasonsSerializer


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)




        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)
