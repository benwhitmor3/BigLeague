from django.test import TestCase
from rest_framework.test import APITestCase

from rest_framework.test import APITestCase

from rest_framework_jwt.settings import api_settings

from django.contrib.auth import get_user_model
from rest_framework.reverse import reverse as api_reverse

# Create your tests here.

# class PlayergenerationAPITestCase(APITestCase):
#     def setUp(self):

def test_get_playergeneration(self):
    # test the get list
    data = {}
    url = api_reverse("playergeneration")
    response = self.client.get(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    print(response.data)