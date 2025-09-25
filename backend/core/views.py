from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Service, Course
from .serializers import ServiceSerializer, CourseSerializer
import json
import logging

logger = logging.getLogger(__name__)

def home(request):
    """Simple home view that returns basic HTML"""
    return HttpResponse("<h1>RadioFusion Backend API</h1><p>Server is running successfully!</p>")

def test_api(request):
    """Simple test endpoint to verify API functionality"""
    return JsonResponse({
        'status': 'success',
        'message': 'API is working correctly',
        'server': 'Azure Web App',
        'timestamp': 'N/A'
    })

def health_check(request):
    """Health check endpoint for monitoring"""
    return JsonResponse({
        'status': 'healthy',
        'service': 'radiofusion-backend'
    })

@api_view(['GET'])
def get_services(request):
    """Get all services"""
    try:
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)
    except Exception as e:
        logger.error(f"Error fetching services: {str(e)}")
        return Response(
            {'error': 'Failed to fetch services'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def get_courses(request):
    """Get all courses"""
    try:
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)
    except Exception as e:
        logger.error(f"Error fetching courses: {str(e)}")
        return Response(
            {'error': 'Failed to fetch courses'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
