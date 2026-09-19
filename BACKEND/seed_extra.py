import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import Project, ProjectImage, Certification

CERTIFICATIONS = [
    {
        "title": "NFPA Certified Fire Protection Specialist",
        "issuer": "NFPA",
        "year": "2022",
        "image": "/images/cert_nfpa.jpg"
    },
    {
        "title": "ISO 9001:2015 Quality Management",
        "issuer": "ISO",
        "year": "2021",
        "image": "/images/cert_iso.jpg"
    },
    {
        "title": "Department of Explosives Authorization",
        "issuer": "Govt. of Bangladesh",
        "year": "2023",
        "image": "/images/cert_doe.jpg"
    }
]

def seed_extra():
    print("Seeding Certifications...")
    for cert in CERTIFICATIONS:
        Certification.objects.get_or_create(
            title=cert['title'],
            defaults={
                "issuer": cert['issuer'],
                "year": cert['year'],
                "image": cert['image']
            }
        )
    print(f"[SUCCESS] {Certification.objects.count()} Certifications seeded.")

    print("Seeding Project Images...")
    # Clean old dummy images
    ProjectImage.objects.all().delete()
    
    projects = Project.objects.all()
    # List of real photos available in the public/images folder
    real_photos = [
        "/images/boiler_mechanical_1789628212983.jpg",
        "/images/fire_equipment_1789629783806.jpg",
        "/images/fire_exit_door_1789631158611.jpg",
        "/images/gas_suppression_1789629926454.jpg",
        "/images/heavy_generator_1789631192366.jpg",
        "/images/lpg_reticulation_1789628239652.jpg",
        "/images/sprinklers_ceiling_1789631128988.jpg"
    ]
    
    for proj in projects:
        # Create real gallery images for each project
        if proj.category == 'fire':
            ProjectImage.objects.create(project=proj, image="/images/fire_equipment_1789629783806.jpg", caption="Fire Equipment Setup")
            ProjectImage.objects.create(project=proj, image="/images/sprinklers_ceiling_1789631128988.jpg", caption="Ceiling Sprinkler Network")
            ProjectImage.objects.create(project=proj, image="/images/gas_suppression_1789629926454.jpg", caption="Gas Suppression System")
            ProjectImage.objects.create(project=proj, image="/images/fire_exit_door_1789631158611.jpg", caption="UL Listed Fire Doors")
        elif proj.category == 'mechanical':
            ProjectImage.objects.create(project=proj, image="/images/boiler_mechanical_1789628212983.jpg", caption="Heavy Boiler Setup")
            ProjectImage.objects.create(project=proj, image="/images/heavy_generator_1789631192366.jpg", caption="Industrial Generator")
        elif proj.category == 'lpg':
            ProjectImage.objects.create(project=proj, image="/images/lpg_reticulation_1789628239652.jpg", caption="Central LPG Reticulation")
        else:
            ProjectImage.objects.create(project=proj, image=proj.image, caption="Main View")

    print(f"[SUCCESS] {ProjectImage.objects.count()} Project Images seeded.")

if __name__ == '__main__':
    seed_extra()
