from django.http import HttpResponse

def user(request):
  return HttpResponse('User Details')

def home(request):
  return HttpResponse('Home Page')
