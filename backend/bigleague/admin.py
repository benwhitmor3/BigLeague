from django.contrib import admin
import sys

sys.path.append('/Users/buw0017/projects/TheBigLeagueGame/backend')
from bigleague.models import Lead
from bigleague.models import Playergeneration

# Register your models here.
admin.site.register(Lead)
admin.site.register(Playergeneration)

