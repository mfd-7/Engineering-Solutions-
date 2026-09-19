# Engineering Solutions Platform

An enterprise web application built for Engineering Solutions, providing fire safety, mechanical, and LPG engineering system specifications, interactive 3D equipment visualization, turnkey project portfolios, and automated client quote processing.

## Production URL

- Primary Web Platform: https://engineering-solutions-puce.vercel.app

## Project Architecture

The repository is organized into a decoupled client-server model following the Model-View-Controller (MVC) architectural pattern:

- **FRONTEND**: Single Page Application built with React 19, Vite, Lucide Icons, and Three.js / HTML5 Canvas for interactive 3D fire pump simulations.
- **BACKEND**: RESTful API service developed using Django and Django REST Framework (DRF) for lead management and project data persistence.

## System Requirements & Local Setup

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.10 or higher)

### Frontend Installation

```bash
cd FRONTEND
npm install
npm run dev
```

To create a production build:

```bash
npm run build
```

### Backend Setup

```bash
cd BACKEND
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Author & Credits

- Developer: MD. MUHTASIM FUAD
- Institution: Computer Science Student, BRAC University
- Contact: muhtasimfuad3570@gmail.com
- Profile: https://www.linkedin.com/in/real-muhtasim-fuad/

## License

Copyright (c) 2026 MD. MUHTASIM FUAD. All rights reserved.
Refer to the LICENSE file for usage permissions and legal terms.
