const PlannerData = {
    roofTypes: [
        {
            id: 'gable',
            name: 'Gable',
            icon: '🏠',
            efficiency: 1.0,
            description: 'Classic A-frame roof, ideal for solar'
        },
        {
            id: 'hip',
            name: 'Hip',
            icon: '🏘️',
            efficiency: 0.95,
            description: 'Sloped on all sides'
        },
        {
            id: 'flat',
            name: 'Flat',
            icon: '🏢',
            efficiency: 0.85,
            description: 'Modern flat roof design'
        }
    ],
    houseSizes: [
        {
            id: 'small',
            name: 'Small',
            icon: '🏠',
            description: '< 1,500 sq ft',
            baseEnergy: 800,
            panelCount: 15,
            systemSize: 4.5
        },
        {
            id: 'medium',
            name: 'Medium',
            icon: '🏡',
            description: '1,500-2,500 sq ft',
            baseEnergy: 1200,
            panelCount: 20,
            systemSize: 6.5
        },
        {
            id: 'large',
            name: 'Large',
            icon: '🏘️',
            description: '> 2,500 sq ft',
            baseEnergy: 1800,
            panelCount: 28,
            systemSize: 9.0
        }
    ],
    appliances: [
        {
            id: 'ac',
            name: 'A/C Unit',
            icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2',
            power: 3.5,
            monthlyUsage: 450,
            category: 'climate',
            defaultSelected: false
        },
        {
            id: 'washer-dryer',
            name: 'Washer/Dryer',
            icon: 'M14 10H4.228c-.464 0-.909.184-1.239.514l-2.43 2.43a1 1 0 000 1.414l2.43 2.43c.33.33.775.514 1.239.514H14M14 10l7-7m0 0l-7 7m7-7v14m0-14H18',
            power: 2.0,
            monthlyUsage: 100,
            category: 'appliances',
            defaultSelected: false
        },
        {
            id: 'pool',
            name: 'Pool Pump',
            icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
            power: 1.5,
            monthlyUsage: 180,
            category: 'outdoor',
            defaultSelected: true
        },
        {
            id: 'ev',
            name: 'Electric Car',
            icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
            power: 7.0,
            monthlyUsage: 300,
            category: 'vehicle',
            defaultSelected: true
        },
        {
            id: 'heater',
            name: 'Water Heater',
            icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z',
            power: 4.0,
            monthlyUsage: 400,
            category: 'appliances',
            defaultSelected: false
        },
        {
            id: 'dishwasher',
            name: 'Dishwasher',
            icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
            power: 1.8,
            monthlyUsage: 45,
            category: 'appliances',
            defaultSelected: false
        },
        {
            id: 'refrigerator',
            name: 'Refrigerator',
            icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
            power: 0.15,
            monthlyUsage: 100,
            category: 'appliances',
            defaultSelected: false
        },
        {
            id: 'oven',
            name: 'Electric Oven',
            icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
            power: 2.3,
            monthlyUsage: 60,
            category: 'appliances',
            defaultSelected: false
        }
    ],
    peopleEnergyMultiplier: {
        1: 0.6,
        2: 0.8,
        3: 0.95,
        4: 1.0,
        5: 1.15,
        6: 1.3,
        7: 1.45,
        8: 1.6
    },
    orientationEfficiency: (angle) => {
        const absAngle = Math.abs(angle);
        if (absAngle <= 15) return 1.0;
        if (absAngle <= 30) return 0.95;
        if (absAngle <= 45) return 0.85;
        if (absAngle <= 60) return 0.7;
        return 0.6;
    },
    batteryRecommendation: (systemSize) => {
        if (systemSize < 5) return { count: 1, capacity: 10 };
        if (systemSize < 7) return { count: 1, capacity: 13.5 };
        return { count: 2, capacity: 13.5 };
    },
    costPerWatt: 2.5,
    electricityRate: 0.13,
    annualSunHours: 1800,
    
    co2PerKWh: 0.85
};
class SolarCalculator {
    constructor(config) {
        this.config = config;
    }
    calculateMonthlyEnergy(houseSize, peopleCount, appliances) {
        const sizeData = this.config.houseSizes.find(s => s.id === houseSize);
        const baseEnergy = sizeData.baseEnergy;
        const peopleMultiplier = this.config.peopleEnergyMultiplier[peopleCount];
        
        let applianceEnergy = 0;
        appliances.forEach(appId => {
            const appliance = this.config.appliances.find(a => a.id === appId);
            if (appliance) applianceEnergy += appliance.monthlyUsage;
        });
        return (baseEnergy * peopleMultiplier) + applianceEnergy;
    }
    calculateSystemProduction(systemSize, roofType, orientation) {
        const roofData = this.config.roofTypes.find(r => r.id === roofType);
        const roofEfficiency = roofData.efficiency;
        const orientationEfficiency = this.config.orientationEfficiency(orientation);
        
        const annualProduction = systemSize * this.config.annualSunHours * roofEfficiency * orientationEfficiency;
        return annualProduction / 12;
    }
    calculateCoverage(production, consumption) {
        return Math.round((production / consumption) * 100);
    }
    calculateSavings(monthlyProduction) {
        return Math.round(monthlyProduction * this.config.electricityRate * 12);
    }
    calculateCO2Reduction(annualProduction) {
        return ((annualProduction * this.config.co2PerKWh) / 1000).toFixed(1);
    }
    calculateInstallationCost(systemSize) {
        return Math.round(systemSize * 1000 * this.config.costPerWatt);
    }
    getGrade(coverage) {
        if (coverage >= 100) return 'A+';
        if (coverage >= 90) return 'A';
        if (coverage >= 80) return 'B+';
        if (coverage >= 70) return 'B';
        if (coverage >= 60) return 'C+';
        return 'C';
    }
    getRecommendations(houseSize, peopleCount, appliances, roofType, orientation) {
        const sizeData = this.config.houseSizes.find(s => s.id === houseSize);
        const monthlyConsumption = this.calculateMonthlyEnergy(houseSize, peopleCount, appliances);
        const monthlyProduction = this.calculateSystemProduction(sizeData.systemSize, roofType, orientation);
        const coverage = this.calculateCoverage(monthlyProduction, monthlyConsumption);
        const annualSavings = this.calculateSavings(monthlyProduction);
        const co2Reduction = this.calculateCO2Reduction(monthlyProduction * 12);
        const battery = this.config.batteryRecommendation(sizeData.systemSize);
        const installCost = this.calculateInstallationCost(sizeData.systemSize);
        return {
            grade: this.getGrade(coverage),
            coverage,
            systemSize: sizeData.systemSize,
            panelCount: sizeData.panelCount,
            battery,
            monthlyConsumption: Math.round(monthlyConsumption),
            monthlyProduction: Math.round(monthlyProduction),
            annualSavings,
            co2Reduction,
            installCost,
            paybackYears: (installCost / annualSavings).toFixed(1),
            energyIndependence: Math.min(coverage, 100)
        };
    }
}
