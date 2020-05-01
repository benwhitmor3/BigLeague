from django.contrib import admin
import sys

sys.path.append('/Users/buw0017/projects/TheBigLeagueGame/backend')
from bigleague.models import Cities, Teams, Players, GMs, Coaches, Seasons

# Register your models here.
admin.site.register(Cities)
admin.site.register(Teams)
admin.site.register(Players)
admin.site.register(GMs)
admin.site.register(Coaches)
admin.site.register(Seasons)

