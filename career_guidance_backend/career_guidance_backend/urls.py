from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

# ✅ Add this root view function
def home_view(request):
    return HttpResponse("Welcome to the Career Guidance System API Root.")

urlpatterns = [
    path('', home_view),  # ✅ Now root URL `/` will return this response
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/careers/', include('career.urls')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
