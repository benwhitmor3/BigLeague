from django.db import models
from django.urls import reverse
from django_pandas.io import read_frame

from rest_framework.reverse import reverse as api_reverse

# Create your models here.
class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.CharField(max_length=300)

    def __str__(self):
        return self.name

class Playergeneration(models.Model):
    name = models.CharField(max_length=50)
    suit = models.CharField(max_length=10)
    age = models.IntegerField()
    pv = models.FloatField()
    epv = models.FloatField()
    contract = models.IntegerField()
    t_option = models.IntegerField(blank=True, null=True)
    p_option = models.IntegerField(blank=True, null=True)
    renew = models.CharField(max_length=10)
    salary = models.FloatField()
    grade = models.FloatField()
    team = models.CharField(max_length=25)

    def __str__(self):
        return self.name

    def get_api_url(self, request=None):
        return api_reverse("playergeneration", kwargs={'id': self.id}, request=request)
