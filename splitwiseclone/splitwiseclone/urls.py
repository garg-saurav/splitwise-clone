from django.conf.urls import url
from django.contrib import admin
from django.conf.urls import include

from . import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$',views.home),
    url(r'^user/(?P<userid>[\w-]+)/$',views.user_detail),
    url(r'^account/',include('accounts.urls')),
    url(r'^friends/(?P<username>[\w-]+)/$',views.getfriendlist),
    url(r'^groups/(?P<userid>[\w-]+)/$',views.getallgroups),
    url(r'^newgroup/(?P<username>[\w-]+)/(?P<groupname>[\w-]+)/$',views.new_group),
    url(r'^addfriend/(?P<username>[\w-]+)/(?P<friendname>[\w-]+)/$',views.add_friend),
    url(r'^payfriend/(?P<username>[\w-]+)/(?P<friendname>[\w-]+)/(?P<amount>[\w-]+)/$',views.pay_friend)
]

urlpatterns += staticfiles_urlpatterns()

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)


