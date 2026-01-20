
class MonitorApp {
    constructor() {
        this.calculator = new MonitorCalculator(MonitorData);
        this.updateInterval = null;
        this.init();
    }

    init() {
        this.setupNavigation();
        this.renderDashboard();
        this.renderPerformanceReports();
        this.renderAlerts();
        this.startRealTimeUpdates();
        this.setupEventListeners();
    }

    setupNavigation() {
        const nav = document.getElementById('monitor-nav');
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

    renderDashboard() {

        this.updateLiveMetrics();
        this.updateEnergyFlow();
        this.updateBatteryStatus();
        this.updateSmartTip();
    }

    updateLiveMetrics() {
        const metrics = MonitorData.currentMetrics;

        const prodValue = document.querySelector('.production-value');
        const prodTrend = document.querySelector('.production-trend');
        if (prodValue) {
            prodValue.textContent = metrics.production.toFixed(1);
        }
        if (prodTrend) {
            const change = (Math.random() * 0.6 - 0.3).toFixed(1);
            const arrow = change >= 0 ? '↗' : '↘';
            const color = change >= 0 ? 'text-green-600' : 'text-gray-500';
            prodTrend.innerHTML = `<span class="${color}">${arrow} ${Math.abs(change)} kW from last hour</span>`;
        }

        const consValue = document.querySelector('.consumption-value');
        const consTrend = document.querySelector('.consumption-trend');
        if (consValue) {
            consValue.textContent = metrics.consumption.toFixed(1);
        }
        if (consTrend) {
            const change = (Math.random() * 0.6 - 0.3).toFixed(1);
            const arrow = change >= 0 ? '↗' : '↘';
            const color = change >= 0 ? 'text-gray-500' : 'text-green-600';
            consTrend.innerHTML = `<span class="${color}">${arrow} ${Math.abs(change)} kW from last hour</span>`;
        }
    }

    updateEnergyFlow() {
        const flow = this.calculator.calculateNetFlow();
        const metrics = MonitorData.currentMetrics;

        const solarValue = document.getElementById('flow-solar-value');
        const homeValue = document.getElementById('flow-home-value');
        const batteryValue = document.getElementById('flow-battery-value');
        
        if (solarValue) {
            solarValue.textContent = `${metrics.production.toFixed(1)} kW`;
        }
        if (homeValue) {
            homeValue.textContent = `${metrics.consumption.toFixed(1)} kW`;
        }
        if (batteryValue) {
            const rate = flow.batteryRate.toFixed(1);
            const sign = flow.batteryRate > 0.1 ? '+' : flow.batteryRate < -0.1 ? '' : '';
            batteryValue.textContent = `${sign}${rate} kW`;
        }
    }

    updateBatteryStatus() {
        const level = Math.round(MonitorData.currentMetrics.batteryLevel);
        const batteryTimeCalc = this.calculator.calculateBatteryTime();
        
        const batteryPercent = document.getElementById('battery-percent');
        const batteryFill = document.querySelector('.battery-fill');
        const batteryStatus = document.getElementById('battery-status');
        const batteryTimeEl = document.getElementById('battery-time');

        if (batteryPercent) {
            batteryPercent.textContent = `${level}%`;
        }

        if (batteryFill) {
            batteryFill.style.height = `${level}%`;

            batteryFill.className = 'battery-fill absolute bottom-0 left-0 right-0 rounded-lg transition-all duration-500';

            if (level > 70) {
                batteryFill.classList.add('bg-gradient-to-t', 'from-green-600', 'to-green-400');
            } else if (level > 30) {
                batteryFill.classList.add('bg-gradient-to-t', 'from-yellow-600', 'to-yellow-400');
            } else {
                batteryFill.classList.add('bg-gradient-to-t', 'from-red-600', 'to-red-400');
            }
        }

        if (batteryStatus && batteryTimeEl) {
            const rate = Math.abs(MonitorData.currentMetrics.batteryRate).toFixed(1);
            
            if (batteryTimeCalc.type === 'charging') {
                batteryStatus.innerHTML = `Charging at <span class="font-semibold text-green-600">${rate} kW</span>`;
                const timeStr = this.formatBatteryTime(batteryTimeCalc.minutes);
                batteryTimeEl.textContent = `Full in ${timeStr}`;
            } else if (batteryTimeCalc.type === 'discharging') {
                batteryStatus.innerHTML = `Discharging at <span class="font-semibold text-orange-600">${rate} kW</span>`;
                const timeStr = this.formatBatteryTime(batteryTimeCalc.minutes);
                batteryTimeEl.textContent = `Empty in ${timeStr}`;
            } else {
                batteryStatus.innerHTML = `<span class="font-semibold text-gray-600">Idle</span>`;
                batteryTimeEl.textContent = `Maintaining charge`;
            }
        }
    }

    formatBatteryTime(minutes) {
        if (minutes < 60) {
            return `~${Math.round(minutes)} min`;
        } else if (minutes < 120) {
            return `~${Math.round(minutes / 60)} hr`;
        } else {
            const hours = Math.floor(minutes / 60);
            const mins = Math.round(minutes % 60);
            return mins > 0 ? `~${hours}h ${mins}m` : `~${hours} hr`;
        }
    }

    updateSmartTip() {
        const tip = this.calculator.getSmartTip();
        const tipContainer = document.getElementById('smart-tip');
        
        if (tipContainer) {
            tipContainer.innerHTML = `
                <h3 class="text-lg font-semibold text-green-900 mb-3 flex items-center">
                    <span class="text-2xl mr-2">${tip.icon}</span> Smart Tip
                </h3>
                <p class="text-green-800 font-medium">${tip.message}</p>
            `;
        }
    }

    renderPerformanceReports() {
        const stats = this.calculator.calculateMonthlyStats();
        const goals = this.calculator.checkGoals();
        const insights = this.calculator.generateInsights();

        const independenceEl = document.getElementById('independence-value');
        const independenceGoal = document.getElementById('independence-goal');
        const independenceStatus = document.getElementById('independence-status');
        
        if (independenceEl) independenceEl.textContent = stats.currentMonth.independence;
        if (independenceGoal) independenceGoal.textContent = MonitorData.goals.energyIndependence;
        
        if (independenceStatus) {
            if (goals.independenceMet) {
                independenceStatus.innerHTML = `<span class="font-semibold text-green-600">beating your goal</span>`;
            } else {
                independenceStatus.innerHTML = `<span class="font-semibold text-orange-600">working towards your goal</span>`;
            }
        }

        const savingsEl = document.getElementById('savings-value');
        const totalSavingsEl = document.getElementById('total-savings');
        
        if (savingsEl) savingsEl.textContent = stats.currentMonth.savings;
        if (totalSavingsEl) totalSavingsEl.textContent = stats.total.savings;

        this.renderInsights(insights);
    }

    renderInsights(insights) {
        const container = document.getElementById('performance-insights');
        if (!container || !insights || insights.length === 0) return;
        
        container.innerHTML = '';
        insights.forEach((insight, index) => {
            const div = document.createElement('div');
            div.className = `p-4 rounded-xl border-2 ${this.getInsightClass(insight.type)}`;
            div.style.animationDelay = `${index * 0.1}s`;
            div.innerHTML = `<p class="font-medium">${insight.text}</p>`;
            container.appendChild(div);
        });
    }

    getInsightClass(type) {
        const classes = {
            success: 'bg-green-50 border-green-300 text-green-900',
            progress: 'bg-blue-50 border-blue-300 text-blue-900',
            environmental: 'bg-emerald-50 border-emerald-300 text-emerald-900',
            improvement: 'bg-purple-50 border-purple-300 text-purple-900'
        };
        return classes[type] || 'bg-gray-50 border-gray-300 text-gray-900';
    }

    renderAlerts() {
        const alertsContainer = document.getElementById('alerts-container');
        const alertBadge = document.querySelector('.sub-nav-btn[data-target="monitor-task7"] .live-pulse');
        
        if (MonitorData.alerts.length === 0) {

            if (alertBadge) alertBadge.style.display = 'none';
            if (alertsContainer) {
                alertsContainer.innerHTML = `
                    <div class="text-center py-16">
                        <div class="text-6xl mb-4">✅</div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-2">All Clear!</h3>
                        <p class="text-gray-600">Your solar system is operating normally with no alerts.</p>
                    </div>
                `;
            }
            return;
        }

        if (alertBadge) {
            alertBadge.textContent = MonitorData.alerts.length;
            alertBadge.style.display = 'inline-flex';
        }


    }

    startRealTimeUpdates() {

        this.updateInterval = setInterval(() => {
            this.simulateDataChange();
            this.updateLiveMetrics();
            this.updateEnergyFlow();
            this.updateBatteryStatus();
            this.updateSmartTip();
        }, 5000);
    }

    simulateDataChange() {

        const prodChange = (Math.random() - 0.5) * 0.3;
        MonitorData.currentMetrics.production = Math.max(0, Math.min(8, MonitorData.currentMetrics.production + prodChange));

        const consChange = (Math.random() - 0.5) * 0.2;
        MonitorData.currentMetrics.consumption = Math.max(0.2, Math.min(6, MonitorData.currentMetrics.consumption + consChange));

        const flow = this.calculator.calculateNetFlow();
        const batteryChangeRate = 0.15;
        
        if (flow.batteryRate > 0.1 && MonitorData.currentMetrics.batteryLevel < 100) {

            MonitorData.currentMetrics.batteryLevel = Math.min(100, MonitorData.currentMetrics.batteryLevel + batteryChangeRate);
        } else if (flow.batteryRate < -0.1 && MonitorData.currentMetrics.batteryLevel > 0) {

            MonitorData.currentMetrics.batteryLevel = Math.max(0, MonitorData.currentMetrics.batteryLevel - batteryChangeRate);
        }

        MonitorData.currentMetrics.batteryLevel = Math.round(MonitorData.currentMetrics.batteryLevel * 10) / 10;
        MonitorData.currentMetrics.batteryRate = flow.batteryRate;
    }

    setupEventListeners() {

        const contactBtn = document.getElementById('contact-expert-btn');
        const supportStatus = document.getElementById('support-status');

        const falseAlarmBtn = document.getElementById('false-alarm-btn');
        const falseAlarmStatus = document.getElementById('false-alarm-status');
        
        if (contactBtn && supportStatus) {
            contactBtn.addEventListener('click', () => {
                contactBtn.closest('.bg-white').style.display = 'none';
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

        if (falseAlarmBtn && falseAlarmStatus) {
            falseAlarmBtn.addEventListener('click', () => {

                const alertSections = document.querySelectorAll('#monitor-task7 > div > .bg-white, #monitor-task7 > div > .bg-gradient-to-r');
                alertSections.forEach(section => {
                    section.style.display = 'none';
                });

                falseAlarmStatus.classList.remove('hidden');
                falseAlarmStatus.scrollIntoView({ behavior: 'smooth' });

                MonitorData.alerts = [];

                const alertBadge = document.querySelector('.sub-nav-btn[data-target="monitor-task7"] .live-pulse');
                if (alertBadge) {
                    alertBadge.style.display = 'none';
                }

                const alertBanner = document.getElementById('alert-banner');
                if (alertBanner) {
                    alertBanner.classList.remove('active');
                }
            });
        }

        const returnBtn = document.getElementById('return-to-dashboard');
        if (returnBtn) {
            returnBtn.addEventListener('click', () => {

                const dashboardBtn = document.querySelector('[data-target="monitor-task3"]');
                if (dashboardBtn) {
                    dashboardBtn.click();
                }
            });
        }

        const alertBanner = document.getElementById('alert-banner');
        if (alertBanner && MonitorData.alerts.length > 0) {
            setTimeout(() => {
                alertBanner.classList.add('active');
            }, 3000);
            
            alertBanner.addEventListener('click', () => {
                const alertsBtn = document.querySelector('[data-target="monitor-task7"]');
                if (alertsBtn) alertsBtn.click();
                alertBanner.classList.remove('active');
            });
        }
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}

if (window.location.pathname.includes('monitor.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        window.monitorApp = new MonitorApp();
    });

    window.addEventListener('beforeunload', () => {
        if (window.monitorApp) {
            window.monitorApp.destroy();
        }
    });
}
