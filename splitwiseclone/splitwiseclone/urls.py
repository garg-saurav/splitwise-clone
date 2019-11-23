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
    url(r'^user/(?P<username>[\w-]+)/$',views.user_detail),
    url(r'^account/',include('accounts.urls')),
    url(r'^friends/(?P<username>[\w-]+)/$',views.getfriendlist),
    url(r'^groups/(?P<username>[\w-]+)/$',views.getallgroups),
    url(r'^newgroup/(?P<username>[\w-]+)/$',views.new_group.as_view()),
    url(r'^addfriend/(?P<username>[\w-]+)/(?P<friend_user_name>[\w-]+)/$',views.add_friend),
    url(r'^payfriend/(?P<username>[\w-]+)/(?P<friendname>[\w-]+)/(?P<amount>[\w-]+)/$',views.pay_friend),
    url(r'^uploadimg/(?P<username>[\w-]+)/$',views.upload_img.as_view(),name='upload'),
    url(r'^addmember/(?P<username>[\w-]+)/$',views.add_friend_in_group.as_view()),
    url(r'^members/(?P<username>[\w-]+)/$',views.get_group_members.as_view()),
    url(r'^frienddetails/(?P<username>[\w-]+)/$',views.friend_detail.as_view()),
    url(r'^settleupall/(?P<username>[\w-]+)/$',views.settle_up_all.as_view()),
    url(r'^trans/(?P<username>[\w-]+)/$',views.add_transaction.as_view()),

]

urlpatterns += staticfiles_urlpatterns()

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)


