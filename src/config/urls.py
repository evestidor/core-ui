from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('stock_manager.urls')),
    path('admin/', admin.site.urls),
]
