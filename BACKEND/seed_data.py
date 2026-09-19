import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import Project, Equipment

PROJECTS_DATA = [
    {
        "id": 1,
        "title": "Beximco Pharma High-Bay Warehouse & Production Facility",
        "category": "Fire Safety",
        "client": "Beximco Pharmaceuticals Ltd.",
        "location": "Tongi, Gazipur",
        "scope": "Turnkey NFPA 13 Automatic Sprinkler Deluge Network, 2500 GPM UL/FM Fire Pump Set, and Beam Smoke Detection.",
        "year": "2021",
        "image": "/images/hero.jpg",
        "featured": True,
        "highlight": "UL Listed 2500 GPM Fire Pump"
    },
    {
        "id": 2,
        "title": "Radisson Blu Water Garden Hotel",
        "category": "Mechanical",
        "client": "Sena Hotel Developments Ltd.",
        "location": "Airport Road, Dhaka",
        "scope": "Central HVAC Hydronic Balancing, Precision Chilled Water Piping, and NFPA Kitchen Hood Wet Chemical Fire Suppression.",
        "year": "2019",
        "image": "/images/boiler.jpg",
        "featured": True,
        "highlight": "Precision Hydronic Balancing"
    },
    {
        "id": 3,
        "title": "Rampal 1320 MW Ultra Supercritical Thermal Power Plant",
        "category": "LPG Systems",
        "client": "BIFPCL (Maitree Super Thermal Power Project)",
        "location": "Rampal, Bagerhat",
        "scope": "Heavy Gas Piping, Bulk LPG Storage Reticulation Station, and Class-1 Div-1 Explosion Proof Gas Leakage Detection System.",
        "year": "2022",
        "image": "/images/lpg.jpg",
        "featured": True,
        "highlight": "Bulk LPG Reticulation Station"
    },
    {
        "id": 4,
        "title": "Square Pharmaceuticals API & Formulation Plants",
        "category": "Fire Safety",
        "client": "Square Pharmaceuticals Ltd.",
        "location": "Kaliakoir, Gazipur",
        "scope": "NFPA 15 Water Spray Fixed Deluge System for solvent storage tanks and FM-200 Clean Agent Gas Suppression for server rooms.",
        "year": "2020",
        "image": "/images/suppression.jpg",
        "featured": True,
        "highlight": "FM-200 Clean Agent & Deluge System"
    },
    {
        "id": 5,
        "title": "Akij Ceramics Industrial Complex",
        "category": "Mechanical",
        "client": "Akij Group",
        "location": "Trishal, Mymensingh",
        "scope": "Heavy Industrial Steam Boiler installation (10 Ton/hr capacity), condensate recovery line, and boiler water softening system.",
        "year": "2021",
        "image": "/images/boiler.jpg",
        "featured": False,
        "highlight": "10 Ton/hr Steam Boiler"
    },
    {
        "id": 6,
        "title": "Bashundhara Multi Food & Beverage Facility",
        "category": "LPG Systems",
        "client": "Bashundhara Group",
        "location": "Meghna Ghat, Narayanganj",
        "scope": "Commercial LPG Vaporizer & Manifold Network with auto shut-off solenoid valves and 24/7 gas pressure monitoring.",
        "year": "2023",
        "image": "/images/lpg.jpg",
        "featured": True,
        "highlight": "LPG Vaporizer & Auto Shut-off"
    },
    {
        "id": 7,
        "title": "ACI Godrej Agrovet Feed Mills",
        "category": "Fire Safety",
        "client": "ACI Godrej Ltd.",
        "location": "Rajshahi & Sirajganj",
        "scope": "External Yard Hydrant Network, Fire Standpipe System, and Heavy Diesel Driven Fire Fighting Pump installation.",
        "year": "2018",
        "image": "/images/valves.jpg",
        "featured": False,
        "highlight": "Heavy Diesel Fire Pump"
    },
    {
        "id": 8,
        "title": "Meghna Industrial Park Power & Chemical Units",
        "category": "Mechanical",
        "client": "Meghna Group of Industries (MGI)",
        "location": "Sonargaon, Narayanganj",
        "scope": "High Pressure Steam Piping, ASME Boiler Feed Pumps, and Industrial Expansion Joint Mechanical Erection.",
        "year": "2022",
        "image": "/images/generator.jpg",
        "featured": True,
        "highlight": "High Pressure Steam Piping"
    },
    {
        "id": 9,
        "title": "PRAN-RFL Agro Industrial Park",
        "category": "LPG Systems",
        "client": "PRAN Agro Ltd.",
        "location": "Habiganj, Sylhet",
        "scope": "Turnkey Centralized LPG Line for bakery ovens and steam generators, compliant with Department of Explosives Bangladesh.",
        "year": "2023",
        "image": "/images/lpg.jpg",
        "featured": False,
        "highlight": "Explosives Dept. Certified LPG"
    },
    {
        "id": 10,
        "title": "Ha-Meem Denim Mega Textile Mills",
        "category": "Fire Safety",
        "client": "Ha-Meem Group",
        "location": "Mawna, Gazipur",
        "scope": "Full Accord / Alliance Compliant Fire Alarm & Intelligent Sprinkler Retrofit covering 450,000 sq.ft manufacturing floor.",
        "year": "2019",
        "image": "/images/sprinklers.jpg",
        "featured": True,
        "highlight": "Accord / Alliance Certified"
    }
]

EQUIPMENT_DATA = [
    {
        "name": "UL/FM Listed Horizontal Split Case Fire Pump",
        "category": "Pumps",
        "brand": "Patterson / Clarke",
        "origin": "USA",
        "description": "High-volume centrifugal fire pump engineered for continuous duty in NFPA 20 industrial fire networks.",
        "image": "/images/valves.jpg",
        "specs": {
            "Capacity": "500 - 3000 GPM",
            "Head / Pressure": "100 - 350 PSI",
            "Drive Type": "Diesel Engine & Electric Motor Dual Drive",
            "Standard": "NFPA 20, UL-448, FM-1311 Approved"
        }
    },
    {
        "name": "Industrial Packaged Steam Boiler",
        "category": "Boilers",
        "brand": "Thermax / Fulton",
        "origin": "India / USA",
        "description": "Three-pass wetback packaged steam boiler offering 92%+ thermal efficiency with dual fuel firing.",
        "image": "/images/boiler.jpg",
        "specs": {
            "Steam Capacity": "1 Ton/hr to 25 Ton/hr",
            "Working Pressure": "10.54 - 24.5 bar",
            "Fuel Capability": "Gas, Diesel & Heavy Fuel Oil",
            "Safety Standards": "ASME Boiler Code Section I, Chief Inspector of Boilers BD"
        }
    },
    {
        "name": "Central LPG Reticulation Storage & Vaporizer",
        "category": "LPG",
        "brand": "Algas-SDI / Corken",
        "origin": "USA / Europe",
        "description": "Commercial & industrial grade LPG bulk storage and electric water bath vaporizer station.",
        "image": "/images/lpg.jpg",
        "specs": {
            "Storage Range": "5,000 Liters - 50,000 Liters",
            "Vaporizer Rate": "50 kg/hr - 1000 kg/hr",
            "Monitoring": "Automated gas leak detection & emergency shut-off",
            "Certification": "ASME Sec VIII, Department of Explosives (Bangladesh)"
        }
    },
    {
        "name": "FM-200 / Novec 1230 Clean Agent Gas Suppression",
        "category": "Suppression",
        "brand": "Kidde Fire Systems",
        "origin": "USA",
        "description": "Total flooding gaseous suppression that extinguishes electrical and flammable liquid fires in 10 seconds.",
        "image": "/images/suppression.jpg",
        "specs": {
            "Agent": "Heptafluoropropane (HFC-227ea) / FK-5-1-12",
            "Discharge Time": "< 10 seconds",
            "Residue": "Zero residue, non-conductive, people-safe",
            "Compliance": "NFPA 2001, UL Listed, FM Approved"
        }
    },
    {
        "name": "UL Listed Pre-Action & Deluge Valve Systems",
        "category": "Pumps",
        "brand": "Viking / Tyco",
        "origin": "USA",
        "description": "Precision hydraulic control valves preventing accidental water discharge in sensitive facilities.",
        "image": "/images/sprinklers.jpg",
        "specs": {
            "Size Range": "2\" to 8\" Flanged",
            "Rated Pressure": "250 PSI / 17.2 bar",
            "Release Mechanism": "Electric, Pneumatic or Hydraulic Release",
            "Approval": "UL Listed, FM Approved, VdS"
        }
    },
    {
        "name": "Heavy Duty Standby Diesel Generator Set",
        "category": "Mechanical",
        "brand": "Cummins / Perkins",
        "origin": "UK / USA",
        "description": "Emergency power generation plant providing instantaneous black-start power to emergency fire pumps.",
        "image": "/images/generator.jpg",
        "specs": {
            "Prime Power": "250 kVA - 2500 kVA",
            "Governor": "Electronic Isochronous Governor",
            "Starting System": "Dual 24V DC Electric Starting Motors",
            "Acoustic": "Sound attenuated weatherproof canopy (75 dBA @ 1m)"
        }
    }
]

def seed():
    print("Seeding Projects...")
    for p in PROJECTS_DATA:
        Project.objects.update_or_create(
            id=p["id"],
            defaults={
                "title": p["title"],
                "category": p["category"],
                "client": p["client"],
                "location": p["location"],
                "scope": p["scope"],
                "year": p["year"],
                "image": p["image"],
                "featured": p["featured"],
                "highlight": p["highlight"]
            }
        )
    print(f"[SUCCESS] {Project.objects.count()} Projects seeded.")

    print("Seeding Equipment...")
    for eq in EQUIPMENT_DATA:
        Equipment.objects.update_or_create(
            name=eq["name"],
            defaults={
                "category": eq["category"],
                "brand": eq["brand"],
                "origin": eq["origin"],
                "description": eq["description"],
                "image": eq["image"],
                "specs": eq["specs"]
            }
        )
    print(f"[SUCCESS] {Equipment.objects.count()} Equipment items seeded.")

if __name__ == '__main__':
    seed()
