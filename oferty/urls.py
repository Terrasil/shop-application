from oferty import views 
from django.urls import path, re_path
from .views import PostDetail
urlpatterns = [ 
    path('api/oferty', views.PostView.as_view(), name='posts_list'),
    path('api/oferty/', views.SearchPostsView.as_view(), ),
    path('api/oferty/<int:pk>/', PostDetail.as_view()),
]