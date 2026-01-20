
class PlannerApp {
    constructor() {
        this.calculator = new SolarCalculator(PlannerData);
        this.state = {
            roofType: 'gable',
            orientation: 0,
            peopleCount: 4,
            houseSize: 'medium',
            selectedAppliances: ['pool', 'ev']
        };
        this.init();
    }

    init() {
        this.setupWizardNavigation();
        this.setupRoofControls();
        this.setupHouseholdControls();
        this.setupApplianceControls();
    }

    setupWizardNavigation() {
        document.querySelectorAll('.wizard-next').forEach(btn => {
            btn.addEventListener('click', () => {
                const currentStep = btn.closest('.step');
                const nextStepId = btn.getAttribute('data-next');
                if (currentStep && nextStepId) {
                    currentStep.classList.remove('active');
                    const nextStep = document.getElementById(nextStepId);
                    if (nextStep) {
                        nextStep.classList.add('active');
                        if (nextStepId === 'step-4') {
                            this.generateReport();
                        }
                    }
                }
            });
        });

        document.querySelectorAll('.wizard-prev').forEach(btn => {
            btn.addEventListener('click', () => {
                const currentStep = btn.closest('.step');
                const prevStepId = btn.getAttribute('data-prev');
                if (currentStep && prevStepId) {
                    currentStep.classList.remove('active');
                    const prevStep = document.getElementById(prevStepId);
                    if (prevStep) {
                        prevStep.classList.add('active');
                    }
                }
            });
        });
    }

    setupRoofControls() {
        const roofButtons = document.querySelectorAll('.roof-type-btn');
        const rotationSlider = document.getElementById('roof-rotation');
        const rotationLabel = document.getElementById('rotation-label');
        const roofSvgs = document.querySelectorAll('.roof-svg');

        roofButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                roofButtons.forEach(b => b.classList.remove('active-roof'));
                btn.classList.add('active-roof');
                
                this.state.roofType = btn.getAttribute('data-roof');
                const targetId = `roof-${this.state.roofType}`;
                
                roofSvgs.forEach(svg => {
                    const isActive = svg.id === targetId;
                    svg.classList.toggle('active-svg', isActive);
                    svg.classList.toggle('hidden', !isActive);
                    if (isActive) {
                        svg.style.transform = `rotateY(${this.state.orientation}deg) rotateX(10deg)`;
                    }
                });
            });
        });

        if (rotationSlider && rotationLabel) {
            rotationSlider.addEventListener('input', (e) => {
                const angle = parseInt(e.target.value, 10);
                this.state.orientation = angle;

                let direction = 'South';
                if (angle < -35) direction = 'South-East';
                else if (angle < -10) direction = 'South (SE)';
                else if (angle > 35) direction = 'South-West';
                else if (angle > 10) direction = 'South (SW)';
                
                const absAngle = Math.abs(angle);
                let quality, color;
                if (absAngle <= 15) {
                    quality = 'Optimal';
                    color = 'text-green-600';
                } else if (absAngle <= 30) {
                    quality = 'Very Good';
                    color = 'text-green-500';
                } else if (absAngle <= 45) {
                    quality = 'Good';
                    color = 'text-yellow-600';
                } else {
                    quality = 'Acceptable';
                    color = 'text-orange-600';
                }

                rotationLabel.innerHTML = `${angle}° (${direction}) - <span class="font-semibold ${color}">${quality}</span>`;

                const activeSvg = document.querySelector('.roof-svg.active-svg');
                if (activeSvg) {
                    activeSvg.style.transform = `rotateY(${angle}deg) rotateX(10deg)`;
                }
            });
        }
    }

    setupHouseholdControls() {
        const peopleValue = document.getElementById('people-value');
        const peopleMinus = document.getElementById('people-minus');
        const peoplePlus = document.getElementById('people-plus');

        if (peopleMinus && peoplePlus) {
            peopleMinus.addEventListener('click', () => {
                if (this.state.peopleCount > 1) {
                    this.state.peopleCount--;
                    peopleValue.textContent = this.state.peopleCount;
                }
            });

            peoplePlus.addEventListener('click', () => {
                if (this.state.peopleCount < 8) {
                    this.state.peopleCount++;
                    peopleValue.textContent = this.state.peopleCount;
                }
            });
        }

        const sizeButtons = document.querySelectorAll('.segment-option');
        sizeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                sizeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.state.houseSize = btn.getAttribute('data-size');
            });
        });
    }

    setupApplianceControls() {
        document.querySelectorAll('.appliance-check').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const applianceId = e.target.getAttribute('data-appliance');
                const label = e.target.closest('label');
                
                if (e.target.checked) {
                    label.classList.add('border-green-400', 'bg-green-50');
                    label.classList.remove('border-gray-200');
                    if (!this.state.selectedAppliances.includes(applianceId)) {
                        this.state.selectedAppliances.push(applianceId);
                    }
                } else {
                    label.classList.remove('border-green-400', 'bg-green-50');
                    label.classList.add('border-gray-200');
                    this.state.selectedAppliances = this.state.selectedAppliances.filter(id => id !== applianceId);
                }
            });
        });
    }

    generateReport() {
        const results = this.calculator.getRecommendations(
            this.state.houseSize,
            this.state.peopleCount,
            this.state.selectedAppliances,
            this.state.roofType,
            this.state.orientation
        );

        const gradeEl = document.getElementById('solar-grade');
        const coverageEl = document.getElementById('coverage-percentage');
        const systemSizeEl = document.getElementById('system-size');
        const panelCountEl = document.getElementById('panel-count');
        const batteryCountEl = document.getElementById('battery-count');
        const batteryCapacityEl = document.getElementById('battery-capacity');
        const annualSavingsEl = document.getElementById('annual-savings');
        const energyIndependenceEl = document.getElementById('energy-independence');
        const co2ReductionEl = document.getElementById('co2-reduction');
        const installCostEl = document.getElementById('install-cost');
        const paybackYearsEl = document.getElementById('payback-years');
        const roofQualityEl = document.getElementById('roof-quality');
        const monthlyConsumptionEl = document.getElementById('monthly-consumption');
        const monthlyProductionEl = document.getElementById('monthly-production');

        if (gradeEl) gradeEl.textContent = results.grade;
        if (coverageEl) coverageEl.textContent = results.coverage;
        if (systemSizeEl) systemSizeEl.textContent = results.systemSize;
        if (panelCountEl) panelCountEl.textContent = results.panelCount;
        if (batteryCountEl) batteryCountEl.textContent = results.battery.count;
        if (batteryCapacityEl) batteryCapacityEl.textContent = results.battery.capacity;
        if (annualSavingsEl) annualSavingsEl.textContent = results.annualSavings.toLocaleString();
        if (energyIndependenceEl) energyIndependenceEl.textContent = results.energyIndependence;
        if (co2ReductionEl) co2ReductionEl.textContent = results.co2Reduction;
        if (installCostEl) installCostEl.textContent = results.installCost.toLocaleString();
        if (paybackYearsEl) paybackYearsEl.textContent = results.paybackYears;
        if (monthlyConsumptionEl) monthlyConsumptionEl.textContent = results.monthlyConsumption;
        if (monthlyProductionEl) monthlyProductionEl.textContent = results.monthlyProduction;

        if (roofQualityEl) {
            const efficiency = PlannerData.orientationEfficiency(this.state.orientation);
            if (efficiency >= 0.95) {
                roofQualityEl.textContent = '✓ Excellent roof orientation for solar';
            } else if (efficiency >= 0.85) {
                roofQualityEl.textContent = '✓ Good roof orientation for solar';
            } else {
                roofQualityEl.textContent = '⚠ Roof orientation is acceptable but not optimal';
            }
        }
    }
}

if (window.location.pathname.includes('planner.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        new PlannerApp();
    });
}
