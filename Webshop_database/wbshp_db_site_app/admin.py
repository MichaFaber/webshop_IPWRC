from django.apps import apps
from django.contrib import admin
from .models import *
# Register your models here.

# models = apps.get_models()

# for model in models:
admin.site.register(Product)