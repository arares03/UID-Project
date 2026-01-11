# SolarHome UI/UX Prototype

**SolarHome** is a high-fidelity Proof of Concept (POC) designed to demonstrate a seamless, end-to-end user experience for residential solar energy management. This prototype bridges the gap between initial home planning, real-time energy monitoring, and professional consultant validation.

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

## 📂 Installation & Local Setup

Since this is a frontend-heavy POC, it runs entirely in the browser.

1.  **Clone/Save the Code:** Save the HTML code provided into an `index.html` file.
2.  **CSS Dependency:** The prototype looks for a `styles.css` file. To ensure animations (like the energy flow and alerts) work correctly, create a `styles.css` in the same folder and add:

```css
/* Core Layout & Transitions */
.page-content, .sub-page { display: none; }
.page-content.active, .sub-page.active { display: block; }
.step { display: none; transition: all 0.3s ease; }
.step.active { display: block; }

/* 3D Roof Transformations */
.perspective-1000 { perspective: 1000px; }
.roof-svg { 
    width: 180px; height: 180px; fill: #16a34a; 
    transition: transform 0.2s ease-out; transform-style: preserve-3d; 
}

/* Animations */
.live-pulse { animation: pulse 2s infinite; }
@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }

.energy-flow-line { stroke-dasharray: 8; animation: flow 1s linear infinite; }
@keyframes flow { to { stroke-dashoffset: -16; } }

/* Alert Banner */
.alert-banner {
    position: fixed; bottom: -100px; left: 50%; transform: translateX(-50%);
    width: 90%; max-width: 500px; background: #dc2626; color: white;
    padding: 1.5rem; border-radius: 1rem; transition: bottom 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 1000; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2);
}
.alert-banner.active { bottom: 24px; }
