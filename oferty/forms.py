from django import forms
from .models import Oferty

class UploadFileForm(forms.ModelForm):
     class Meta:
            fields = (
                  'title',
                  'description',
                  'price',
                  'upload',
                )