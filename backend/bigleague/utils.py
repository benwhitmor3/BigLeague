from bigleague.serializers import UserSerializer


def my_jwt_response_handler(token, user=None, request=None):
    print("did this run??")
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }
