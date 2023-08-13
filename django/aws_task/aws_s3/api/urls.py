from django.urls import path , include
from .views.buckets import BucketView
from .views.objects import ObjectsView



urlpatterns = [
    path('buckets',BucketView.as_view() ),
    path('objects/<str:bucket>',ObjectsView.as_view() ),

]