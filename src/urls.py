from django.conf import settings
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path(settings.URL_PREFIX, include('src.stock_manager.urls')),
    path('{}/admin/'.format(settings.URL_PREFIX), admin.site.urls),
]
