from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer
from .models import User

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import LoginSerializer

class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer
