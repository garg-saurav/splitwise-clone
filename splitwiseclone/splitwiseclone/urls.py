from django.conf.urls import url
from django.contrib import admin
from django.urls import include

from . import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$',views.home),
    url(r'^user/(?P<userid>[\w-]+)/$',views.user_detail),
    url(r'^account/',include('accounts.urls'))
]

#
#

urlpatterns += staticfiles_urlpatterns()

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)


