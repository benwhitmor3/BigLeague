from django.contrib import admin
import sys

sys.path.append('/Users/buw0017/projects/TheBigLeagueGame/backend')
from bigleague.models import Franchise, City, Stadium, Player, GM, Coach, Season

# Register your models here.
admin.site.register(Franchise)
admin.site.register(City)
admin.site.register(Stadium)
admin.site.register(Player)
admin.site.register(GM)
admin.site.register(Coach)
admin.site.register(Season)

