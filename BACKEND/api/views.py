from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from .models import Project, Equipment, Lead
from .serializers import ProjectSerializer, EquipmentSerializer, LeadSerializer

class ProjectListAPIView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    pagination_class = None

    def get_queryset(self):
        queryset = Project.objects.all()
        category = self.request.query_params.get('category', None)
        search = self.request.query_params.get('search', None)

        if category and category != 'All':
            queryset = queryset.filter(category__iexact=category)

        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(client__icontains=search) |
                Q(location__icontains=search) |
                Q(scope__icontains=search)
            )

        return queryset


class EquipmentListAPIView(generics.ListAPIView):
    serializer_class = EquipmentSerializer
    pagination_class = None

    def get_queryset(self):
        queryset = Equipment.objects.all()
        category = self.request.query_params.get('category', None)
        if category and category != 'All':
            queryset = queryset.filter(category__iexact=category)
        return queryset


class LeadListCreateAPIView(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    pagination_class = None

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        lead = serializer.save()

        print(f"\n=======================================================")
        print(f"🔔 [ENGINEERING SOLUTIONS LEAD ALERT] -> muhtasimfuad3570@gmail.com")
        print(f"Company: {lead.company} | Contact: {lead.full_name}")
        print(f"Phone: {lead.phone} | Email: {lead.email}")
        print(f"Discipline: {lead.project_type} | Site: {lead.site_sqft}")
        print(f"Message: {lead.message}")
        print(f"=======================================================\n")

        return Response({
            "success": True,
            "message": "Official proposal request received. Our engineering directorate will contact you within 2 business hours.",
            "lead": serializer.data
        }, status=status.HTTP_201_CREATED)


class LeadDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer


class HydraulicEstimatorAPIView(APIView):
    PROFILES = {
        'light': {'gpm': 500, 'duration': 60, 'hazard': 'Light Hazard (Offices / Commercial)'},
        'commercial': {'gpm': 1000, 'duration': 90, 'hazard': 'Ordinary Hazard Group 1 (Factories / Garments)'},
        'industrial': {'gpm': 1500, 'duration': 120, 'hazard': 'Ordinary Hazard Group 2 (Chemical / Pharma)'},
        'power_lpg': {'gpm': 2500, 'duration': 180, 'hazard': 'Extra Hazard (Power Stations / LPG Terminals)'}
    }

    def post(self, request):
        occupancy = request.data.get('occupancy', 'commercial')
        sqft = float(request.data.get('sqft', 50000))
        floors = int(request.data.get('floors', 10))

        profile = self.PROFILES.get(occupancy, self.PROFILES['commercial'])
        base_gpm = profile['gpm']
        duration = profile['duration']

        area_factor = max(1.0, (sqft / 50000) * 0.2 + 0.8)
        standpipe_allowance = min(500, floors * 50)
        
        required_gpm = int((base_gpm * area_factor) + standpipe_allowance)
        total_gallons = int(required_gpm * duration)
        total_liters = int(total_gallons * 3.78541)

        return Response({
            "occupancy": occupancy,
            "hazard_rating": profile['hazard'],
            "required_gpm": required_gpm,
            "duration_minutes": duration,
            "reservoir_gallons": total_gallons,
            "reservoir_liters": total_liters,
            "pump_recommendation": f"{required_gpm} GPM UL-Listed Horizontal Split Case Fire Pump",
            "compliance_standard": "NFPA 13, NFPA 20, BNBC 2020 Standard"
        })

class CertificationListAPIView(generics.ListAPIView):
    from .models import Certification
    from .serializers import CertificationSerializer
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer
    pagination_class = None
