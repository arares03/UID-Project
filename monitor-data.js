
const MonitorData = {

    currentMetrics: {
        production: 4.1,
        consumption: 1.2,
        batteryLevel: 75,
        batteryRate: 2.9,
        gridExport: 0,
        gridImport: 0
    },

    historicalData: {
        production: [2.1, 2.8, 3.5, 4.2, 4.5, 4.1],
        consumption: [1.5, 1.8, 1.2, 0.9, 1.3, 1.2],
        battery: [45, 52, 58, 65, 72, 75]
    },

    monthlyData: {
        energyProduction: [420, 510, 450, 580, 495, 560],
        energySavings: [150, 180, 165, 210, 175, 195],
        gridExport: [120, 150, 135, 180, 145, 165],
        selfConsumption: [88, 91, 89, 93, 90, 92]
    },

    alerts: [
        {
            id: 1,
            severity: 'critical',
            title: 'Inverter Offline',
            description: 'Your solar inverter has stopped responding',
            impact: [
                '⚡ Your home is currently drawing power from the grid',
                '☀️ Solar production is paused',
                '🔋 Battery is not charging'
            ],
            timestamp: new Date('2026-01-20T14:34:00'),
            troubleshooting: [
                {
                    step: 1,
                    title: 'Check the circuit breaker',
                    description: 'Look for the breaker labeled "Solar System" in your electrical panel. Make sure it\'s in the ON position.'
                },
                {
                    step: 2,
                    title: 'Check the inverter display',
                    description: 'Look at the screen or LED lights on your inverter (usually in the garage or utility room). Are there any error codes or red lights?'
                },
                {
                    step: 3,
                    title: 'Restart the inverter',
                    description: 'Turn off the DC disconnect switch near your inverter, wait 30 seconds, then turn it back on. Wait 5 minutes for the system to restart.'
                }
            ]
        }
    ],

    smartTips: [
        {
            condition: (data) => data.production > 3 && data.batteryLevel > 70,
            icon: '💡',
            message: 'Peak Sun! ☀️ Perfect time to run the dishwasher or charge your EV.',
            priority: 'high'
        },
        {
            condition: (data) => data.batteryLevel < 30 && data.production < 1,
            icon: '🔋',
            message: 'Battery running low. Consider reducing non-essential usage.',
            priority: 'medium'
        },
        {
            condition: (data) => data.consumption > data.production + 2,
            icon: '⚠️',
            message: 'High energy usage detected. Check for devices running unnecessarily.',
            priority: 'medium'
        },
        {
            condition: (data) => data.production > data.consumption && data.batteryLevel === 100,
            icon: '💰',
            message: 'Exporting excess energy to the grid. Earning credits!',
            priority: 'low'
        },
        {
            condition: (data) => data.batteryLevel === 100,
            icon: '✨',
            message: 'Battery fully charged! Your home has backup power ready.',
            priority: 'low'
        }
    ],

    goals: {
        energyIndependence: 90,
        monthlySavings: 200,
        co2Reduction: 500
    },

    systemSpecs: {
        solarPanels: {
            count: 20,
            capacity: 6.5,
            brand: 'SunPower',
            efficiency: 22.8
        },
        battery: {
            count: 1,
            capacity: 13.5,
            brand: 'Tesla Powerwall',
            warrantyYears: 10
        },
        inverter: {
            brand: 'Enphase',
            model: 'IQ8+',
            efficiency: 97.5
        }
    },

    pricing: {
        gridRate: 0.13,
        exportRate: 0.08,
        peakRate: 0.19,
        offPeakRate: 0.09
    }
};

class MonitorCalculator {
    constructor(config) {
        this.config = config;
    }

    calculateNetFlow() {
        const prod = this.config.currentMetrics.production;
        const cons = this.config.currentMetrics.consumption;
        const batteryRate = this.config.currentMetrics.batteryRate;
        
        const net = prod - cons;
        
        let gridExport = 0;
        let gridImport = 0;
        let actualBatteryRate = batteryRate;
        
        if (net > 0) {

            if (this.config.currentMetrics.batteryLevel < 100) {
                actualBatteryRate = Math.min(net, 5);
            } else {
                actualBatteryRate = 0;
                gridExport = net;
            }
        } else {

            const deficit = Math.abs(net);
            if (this.config.currentMetrics.batteryLevel > 10) {
                actualBatteryRate = -Math.min(deficit, 5);
                gridImport = Math.max(0, deficit - 5);
            } else {
                actualBatteryRate = 0;
                gridImport = deficit;
            }
        }
        
        return {
            netFlow: net,
            gridExport,
            gridImport,
            batteryRate: actualBatteryRate,
            surplus: net > 0
        };
    }

    calculateBatteryTime() {
        const level = this.config.currentMetrics.batteryLevel;
        const rate = this.config.currentMetrics.batteryRate;
        const capacity = this.config.systemSpecs.battery.capacity;
        
        if (rate > 0.1) {

            const remaining = capacity * (100 - level) / 100;
            const hours = remaining / rate;
            return {
                type: 'charging',
                hours: hours,
                minutes: Math.round(hours * 60)
            };
        } else if (rate < -0.1) {

            const remaining = capacity * level / 100;
            const hours = remaining / Math.abs(rate);
            return {
                type: 'discharging',
                hours: hours,
                minutes: Math.round(hours * 60)
            };
        }
        
        return { type: 'idle', hours: 0, minutes: 0 };
    }

    calculateMonthlyStats() {
        const data = this.config.monthlyData;
        const lastMonth = data.energyProduction.length - 1;
        
        const totalProduction = data.energyProduction.reduce((a, b) => a + b, 0);
        const totalSavings = data.energySavings.reduce((a, b) => a + b, 0);
        const avgIndependence = data.selfConsumption.reduce((a, b) => a + b, 0) / data.selfConsumption.length;
        
        const currentMonthSavings = data.energySavings[lastMonth];
        const previousMonthSavings = data.energySavings[lastMonth - 1] || currentMonthSavings;
        const savingsTrend = currentMonthSavings - previousMonthSavings;
        
        return {
            currentMonth: {
                production: data.energyProduction[lastMonth],
                savings: currentMonthSavings,
                independence: data.selfConsumption[lastMonth]
            },
            total: {
                production: totalProduction,
                savings: totalSavings,
                avgIndependence: Math.round(avgIndependence)
            },
            trends: {
                savingsChange: savingsTrend,
                savingsPercent: Math.round((savingsTrend / previousMonthSavings) * 100)
            }
        };
    }

    calculateCO2Savings() {
        const totalProduction = this.config.monthlyData.energyProduction.reduce((a, b) => a + b, 0);
        const co2PerKWh = 0.85;
        return (totalProduction * co2PerKWh / 1000).toFixed(2);
    }

    getSmartTip() {
        const metrics = this.config.currentMetrics;
        
        for (let tip of this.config.smartTips) {
            if (tip.condition(metrics)) {
                return tip;
            }
        }
        
        return {
            icon: '🏡',
            message: 'System running smoothly. Your solar setup is working efficiently!',
            priority: 'low'
        };
    }

    checkGoals() {
        const stats = this.calculateMonthlyStats();
        const goals = this.config.goals;
        
        return {
            independenceMet: stats.currentMonth.independence >= goals.energyIndependence,
            savingsMet: stats.currentMonth.savings >= goals.monthlySavings,
            independencePercent: stats.currentMonth.independence,
            savingsAmount: stats.currentMonth.savings
        };
    }

    generateInsights() {
        const stats = this.calculateMonthlyStats();
        const goals = this.checkGoals();
        const co2Savings = this.calculateCO2Savings();
        
        const insights = [];
        
        if (goals.independenceMet) {
            insights.push({
                type: 'success',
                text: `🎉 You're ${goals.independencePercent}% energy independent, beating your ${this.config.goals.energyIndependence}% goal!`
            });
        } else {
            insights.push({
                type: 'progress',
                text: `⚡ You're ${goals.independencePercent}% energy independent. Keep going to reach your ${this.config.goals.energyIndependence}% goal!`
            });
        }
        
        if (goals.savingsMet) {
            insights.push({
                type: 'success',
                text: `💰 Great job! You saved $${goals.savingsAmount} this month, exceeding your $${this.config.goals.monthlySavings} target!`
            });
        }
        
        insights.push({
            type: 'environmental',
            text: `🌱 Your solar system has offset ${co2Savings} tons of CO₂ emissions!`
        });
        
        if (stats.trends.savingsPercent > 0) {
            insights.push({
                type: 'improvement',
                text: `📈 Your savings increased by ${stats.trends.savingsPercent}% compared to last month!`
            });
        }
        
        return insights;
    }
}
