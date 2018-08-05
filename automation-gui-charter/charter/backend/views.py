from __future__ import unicode_literals

from django.contrib.auth.models import User, Group
from django.shortcuts import render
from serializers import UserSerializer, GroupSerializer
from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from subprocess import Popen
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

