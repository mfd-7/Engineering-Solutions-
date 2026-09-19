# Engineering Solutions - System Architecture & Feature Guide

This document provides a comprehensive breakdown of the Engineering Solutions web application. It explains the core architecture, what each feature does, and how the codebase is structured.

---

## 1. Core Architecture: MVC Pattern

The frontend is built using React (with Vite) and strictly follows the **MVC (Model-View-Controller)** architectural pattern. This ensures that the code is highly organized, scalable, and easy to maintain.

### **M - Models (`/MODELS`)**
Models handle all the data logic, state management, and business rules. They don't know anything about the UI (React components).
*   **`01_ProjectModel.js`**: Manages the database of all 53+ megaprojects (Beximco, Radisson, etc.). It provides functions to fetch, filter, and search projects.
*   **`04_LeadModel.js`**: Handles data validation for client quotes. It validates emails, phone numbers, and manages the local storage database for saving client leads.

### **V - Views (`/VIEWS`)**
Views are pure React components. They are responsible *only* for rendering the UI and capturing user interactions (clicks, typing). 
*   **`SECTIONS/`**: Major page blocks like `01_HeroView.jsx` (top banner), `03_EstimatorView.jsx` (calculator), and `05_ProjectGalleryView.jsx`.
*   **`COMPONENTS/`**: Reusable UI parts like `03_FloatingContactWidgetView.jsx` (the red phone button) and `02_CertificationsMarqueeView.jsx` (scrolling logos).
*   **`MODALS/`**: Popups like `01_QuoteModalView.jsx` for capturing client requirements.

### **C - Controllers (`/CONTROLLERS`)**
Controllers act as the brain bridging Views and Models. When a user clicks a button in a View, the Controller processes it, asks the Model for data, and returns the result to the View.
*   **`01_ProjectController.js`**: Takes search queries from the UI, asks `ProjectModel` for matching projects, and returns them to the screen.
*   **`03_LeadController.js`**: When a user submits a quote, this controller takes the form data, sends it to `LeadModel` for validation, generates a Reference Tracking ID, and returns a success/error message.

---

## 2. Key Features & How They Work

### 1. The Hero Section & 3D Interactive Pump
*   **Location**: `01_HeroView.jsx` & `Interactive3DFirePump.jsx`
*   **What it does**: Welcomes the user with high-impact text and features a Microsoft-style search bar. It includes an interactive 3D representation of an industrial fire pump.
*   **How it works**: The search bar takes keywords (e.g., "tank", "boiler") and smoothly scrolls the user to the relevant section (Estimator, Equipment, or Projects).

### 2. Smart Floating Contact Widget
*   **Location**: `03_FloatingContactWidgetView.jsx`
*   **What it does**: Provides instant access to Direct Call, WhatsApp, and the Quote Form.
*   **How it works**: It uses a React `useEffect` scroll listener. To prevent blocking the developer credit at the bottom of the page, it calculates the position of the footer. As the user reaches the absolute bottom, it dynamically pushes itself up to sit perfectly between the "Request Proposal" button and the copyright text. It also features a click-outside listener to close automatically.

### 3. Automated Quotation & Lead System
*   **Location**: `01_QuoteModalView.jsx` & `03_LeadController.js`
*   **What it does**: Allows enterprise clients to request an official proposal.
*   **How it works**: Captures name, phone, email, and facility scope. The `LeadController` validates the inputs. If valid, it generates a unique "Tracking Ref ID", saves the lead to the local database, and displays a success screen. (It gracefully handles optional fields like "Company" for individual users).

### 4. Hydraulic Estimator (NFPA Calculator)
*   **Location**: `03_EstimatorView.jsx`
*   **What it does**: A built-in calculator for engineers and clients to estimate water reservoir requirements for fire safety systems.
*   **How it works**: Takes inputs (building size, hazard level) and runs mathematical formulas based on NFPA standards to output the required GPM (Gallons Per Minute) and tank capacity.

### 5. Infinite Scrolling Marquees
*   **Location**: `02_CertificationsMarqueeView.jsx` & `index.css`
*   **What it does**: Displays trusted brands (Honeywell, Patterson) and client conglomerates (Beximco, Sheraton) in a continuous sliding loop.
*   **How it works**: Powered purely by CSS animations (`@keyframes marqueeScroll`) for maximum performance without JavaScript lag.

### 6. Admin Lead Management Panel
*   **Location**: `AdminPanelView.jsx`
*   **What it does**: A hidden or secured dashboard where company executives can view submitted quotes.
*   **How it works**: It fetches data from the `LeadModel` (which reads from browser Local Storage) and lists all prospective clients in a clean data table.

---

## 3. The Design System (`index.css`)

The entire application runs on a centralized custom CSS file built around a "Fluent / Off-White Ambient Design System".
*   **Variables**: Colors (`--accent: #E61C24`), backgrounds (`--bg-surface`), and fonts (`Inter`, `Outfit`) are stored as CSS variables at the top of the file.
*   **Responsiveness**: Uses CSS Grid and Flexbox heavily. Media queries automatically stack elements into single columns on mobile devices, ensuring the site looks perfect on all screens.

---

## 4. Example Data Flow: Submitting a Quote

To understand the architecture, here is the exact path data takes when a client requests a quote:

1. **User (View)**: The client fills out the form in `01_QuoteModalView.jsx` and clicks "Submit".
2. **Controller**: The view passes the raw form data to `LeadController.processQuoteSubmission(data)`.
3. **Model**: The controller sends the data to `LeadModel.validate(data)`. The model checks if the email is valid and if the phone number is provided.
4. **Processing**: The model returns `true`. The controller generates a Tracking ID (e.g., `ES-2026-XYZ`).
5. **Database**: The controller calls `LeadModel.saveLead()` to store it in local storage.
6. **Response (View)**: The controller returns a success object back to `QuoteModalView.jsx`, which then hides the form and shows the green checkmark success screen to the client.

