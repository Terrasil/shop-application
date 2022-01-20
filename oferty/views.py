from django.shortcuts import render
from rest_framework import status
from oferty.models import Oferta
from oferty.serializers import OfertySerializer
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from rest_framework import renderers
from rest_framework.exceptions import ParseError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

class PostView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = Oferta.objects.all()
        serializer = OfertySerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        posts_serializer = OfertySerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, *args, **kwargs):
        count = Oferta.objects.all().delete()
        return Response({'message': '{} Tutorials were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Oferta.objects.all()
    serializer_class = OfertySerializer

class SearchPostsView(generics.ListAPIView):
    search_fields = ['title']
    filter_backends = (filters.SearchFilter,)
    queryset = Oferta.objects.all()
    serializer_class = OfertySerializer