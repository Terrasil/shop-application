from rest_framework import serializers 
from oferty.models import Oferta
 
 
class OfertySerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Oferta
        fields = ('id',
                  'title',
                  'description',
                  'price',
                  'published',
                  'upload',
                )