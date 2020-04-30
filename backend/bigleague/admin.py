from django.contrib import admin
import sys

sys.path.append('/Users/buw0017/projects/TheBigLeagueGame/backend')
from bigleague.models import Playergeneration, GM, City

# Register your models here.
admin.site.register(Playergeneration)
admin.site.register(GM)
admin.site.register(City)

