
from django.http import HttpResponse
from wbshp_db_site_app.models import *
 
def index(request):
  return HttpResponse("Happy is a Programming GOD")

def inventory_view(request):
  return HttpResponse("<h1>Your inventrory is empty link to db</h1>")

def show_inventory_list(request):
  return HttpResponse("List object from db to check table")

def crudops(request):

  product = ProductModel(19,19,"Hitman 3", "PS4 game", 59.99, 3)

  product.save()

  objects = ProductModel.objects.all()
  res ='Printing all Dreamreal entries in the DB : <br>'
   
  for elt in objects:
    res += elt.name+"<br>" 

  return HttpResponse(res)   