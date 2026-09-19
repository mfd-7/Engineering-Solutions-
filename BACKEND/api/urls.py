from django.urls import path
from .views import (
    ProjectListAPIView,
    EquipmentListAPIView,
    LeadListCreateAPIView,
    LeadDetailAPIView,
    HydraulicEstimatorAPIView,
    CertificationListAPIView
)

urlpatterns = [
    path('projects/', ProjectListAPIView.as_view(), name='api-projects'),
    path('equipment/', EquipmentListAPIView.as_view(), name='api-equipment'),
    path('leads/', LeadListCreateAPIView.as_view(), name='api-leads'),
    path('leads/<int:pk>/', LeadDetailAPIView.as_view(), name='api-lead-detail'),
    path('estimate/', HydraulicEstimatorAPIView.as_view(), name='api-estimate'),
    path('certifications/', CertificationListAPIView.as_view(), name='api-certifications'),
]
