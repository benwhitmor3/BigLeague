"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from bigleague import views
from rest_framework_jwt.views import obtain_jwt_token
from bigleague.views import current_user

router = routers.DefaultRouter()

router.register(r'playergeneration', views.PlayergenerationView, 'playergeneration_view')
router.register(r'citychoice', views.CityView, 'citychoice_view')
router.register(r'gm', views.GMView, 'gm_view')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('token-auth/', obtain_jwt_token),
    path('current_user/', current_user),
    path('users/', views.UserList.as_view())
    ]
