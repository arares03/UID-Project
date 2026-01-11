# SolarHome UI/UX Prototype

**SolarHome** is a high-fidelity Proof of Concept (POC) designed to demonstrate a seamless, end-to-end user experience for residential solar energy management. This prototype bridges the gap between initial home planning, real-time energy monitoring, and professional consultant validation.
![licensed-image](https://github.com/user-attachments/assets/fd2148fe-b866-4586-92ab-39fd6f1d8a32)

---

## Key Features

### 1. Interactive Solar Planner (Homeowner)
* **3D Roof Visualizer:** Dynamic SVG models (Gable, Hip, Flat) that respond to a rotation slider to determine "Optimal" solar orientation.
* **Smart Energy Profiling:** Multi-step wizard using stepper controls and segmented inputs to calculate energy needs based on household size and appliance load (EVs, Pool Pumps, etc.).
* **Instant Reporting:** Generates a "Solar Score" and a recommended system configuration (Panel count + Battery capacity).

### 2. Live Monitoring Dashboard (Resident)
* **Energy Flow Visualization:** Animated SVG paths showing real-time power distribution between solar panels, home consumption, and battery storage.
* **Predictive Insights:** "Smart Tips" suggest the best times to run high-load appliances based on peak sun.
* **Critical Alert System:** Integrated fault detection that triggers a system-wide alert banner and guides the user through interactive troubleshooting steps.

### 3. Consultant Portal (B2B Admin)
* **Design Validation:** Tools for experts to review homeowner-submitted plans, adjust technical parameters (like R-Values), and leave professional feedback.
* **Aggregate Analytics:** Regional performance maps and system-type distribution charts for platform-wide oversight.

---

## Tech Stack

* **Framework:** [Tailwind CSS](https://tailwindcss.com/) (via CDN) for utility-first styling.
* **Icons/Graphics:** Custom inline SVGs for interactive elements and animations.
* **Fonts:** Inter via Google Fonts.
* **Logic:** Vanilla JavaScript for state management, navigation, and SVG manipulation.

---

## Installation & Local Setup

Since this is a frontend-heavy POC, it runs entirely in the browser.

1.  **Clone/Save the Code:** Save the HTML code provided into an `index.html` file.
2.  **Open the html file in a browser**
