document.querySelectorAll('.wizard-next').forEach(btn => {
    btn.addEventListener('click', () => {
        const currentStep = btn.closest('.step');
        const nextStepId = btn.getAttribute('data-next');
        if (currentStep && nextStepId) {
            currentStep.classList.remove('active');
            const nextStep = document.getElementById(nextStepId);
            if (nextStep) {
                nextStep.classList.add('active');
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

function handleSubNav(navContainerId) {
    const nav = document.getElementById(navContainerId);
    if (!nav) return;
    const buttons = nav.querySelectorAll('.sub-nav-btn');
    const subPages = document.querySelectorAll('.sub-page');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            subPages.forEach(page => {
                page.classList.toggle('active', page.id === targetId);
                page.classList.toggle('hidden', page.id !== targetId);
            });
        });
    });
}
handleSubNav('monitor-nav');
handleSubNav('consultant-nav');

const roofSvgs = document.querySelectorAll('.roof-svg');
const roofButtons = document.querySelectorAll('.roof-type-btn');
let currentRotation = 0;

const rotationSlider = document.getElementById('roof-rotation');
const rotationLabel = document.getElementById('rotation-label');

if (rotationSlider) {
    rotationSlider.addEventListener('input', (e) => {
        const angle = parseInt(e.target.value, 10);
        currentRotation = angle;

        let direction = 'South';
        if (angle < -35) direction = 'South-East';
        else if (angle < -10) direction = 'South (SE)';
        else if (angle > 35) direction = 'South-West';
        else if (angle > 10) direction = 'South (SW)';
        
        const quality = Math.abs(angle) < 15 ? 'Optimal' : 'Acceptable';
        const color = quality === 'Optimal' ? 'text-green-600' : 'text-yellow-600';
        rotationLabel.innerHTML = `${angle}° (${direction}) - <span class="font-semibold ${color}">${quality}</span>`;

        const activeSvg = document.querySelector('.roof-svg.active-svg');
        if (activeSvg) {
            activeSvg.style.transform = `rotateY(${angle}deg) rotateX(10deg)`;
        }
    });
}

roofButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        roofButtons.forEach(b => b.classList.remove('active-roof'));
        btn.classList.add('active-roof');
        
        const targetId = `roof-${btn.getAttribute('data-roof')}`;
        roofSvgs.forEach(svg => {
            const isActive = svg.id === targetId;
            svg.classList.toggle('active-svg', isActive);
            svg.classList.toggle('hidden', !isActive);
            if (isActive) {
                svg.style.transform = `rotateY(${currentRotation}deg) rotateX(10deg)`;
            }
        });
    });
});

let peopleCount = 4;
const peopleValue = document.getElementById('people-value');
const peopleMinus = document.getElementById('people-minus');
const peoplePlus = document.getElementById('people-plus');

if (peopleMinus && peoplePlus) {
    peopleMinus.addEventListener('click', () => {
        if (peopleCount > 1) {
            peopleCount--;
            peopleValue.textContent = peopleCount;
        }
    });

    peoplePlus.addEventListener('click', () => {
        if (peopleCount < 8) {
            peopleCount++;
            peopleValue.textContent = peopleCount;
        }
    });
}

const sizeButtons = document.querySelectorAll('.segment-option');
let selectedSize = 'medium';

sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        sizeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedSize = btn.getAttribute('data-size');
    });
});

document.querySelectorAll('.appliance-check').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        const label = e.target.closest('label');
        if (e.target.checked) {
            label.classList.add('border-green-400', 'bg-green-50');
            label.classList.remove('border-gray-200');
        } else {
            label.classList.remove('border-green-400', 'bg-green-50');
            label.classList.add('border-gray-200');
        }
    });
});

const alertBanner = document.getElementById('alert-banner');

if (alertBanner && window.location.pathname.includes('monitor.html')) {
    setTimeout(() => {
        alertBanner.classList.add('active');
    }, 3000);
}

if (alertBanner) {
    alertBanner.addEventListener('click', () => {
        const alertsBtn = document.querySelector('[data-target="monitor-task7"]');
        if (alertsBtn) {
            alertsBtn.click();
        }
        alertBanner.classList.remove('active');
    });
}

const contactExpertBtn = document.getElementById('contact-expert-btn');
const supportStatus = document.getElementById('support-status');

if (contactExpertBtn && supportStatus) {
    contactExpertBtn.addEventListener('click', () => {
        contactExpertBtn.closest('.bg-white').style.display = 'none';
        const troubleshootingSection = document.querySelector('.troubleshooting-step');
        if (troubleshootingSection) {
            troubleshootingSection.closest('.bg-white').style.display = 'none';
        }
        supportStatus.classList.remove('hidden');
        
        supportStatus.scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
            const statusBadge = supportStatus.querySelector('.status-badge');
            if (statusBadge) {
                statusBadge.classList.remove('status-pending');
                statusBadge.classList.add('status-resolved');
                statusBadge.innerHTML = '<span class="inline-block w-2 h-2 bg-green-600 rounded-full"></span> Expert Reviewing';
            }
        }, 5000);
    });
}
