from django.contrib import admin
import sys

sys.path.append('/Users/buw0017/projects/TheBigLeagueGame/backend')
from bigleague.models import User, Franchise, League, City, Stadium, GM, Coach, Player, Action, Season, Staff, Roster

# Register your models here.
admin.site.register(User)
admin.site.register(Franchise)
admin.site.register(League)
admin.site.register(City)
admin.site.register(Stadium)
admin.site.register(GM)
admin.site.register(Coach)
admin.site.register(Player)
admin.site.register(Action)
admin.site.register(Season)
admin.site.register(Staff)
admin.site.register(Roster)
