
const ConsultantData = {

    consultant: {
        name: 'Sarah Chen',
        role: 'Senior Solar Consultant',
        certifications: ['NABCEP', 'LEED AP'],
        clientsManaged: 47,
        approvalRate: 98.5
    },

    clientProjects: [
        {
            id: 'proj-001',
            clientName: 'Miller Family',
            status: 'needs_review',
            priority: 'high',
            submittedDate: '2026-01-18',
            projectData: {
                people: 4,
                houseSize: 'medium',
                appliances: ['A/C Unit', 'Washer/Dryer', 'Pool Pump', 'Electric Car'],
                roofType: 'gable',
                roofOrientation: 10,
                goalType: 'zero_energy',
                estimatedProduction: 6.5,
                estimatedConsumption: 1200,
                recommendedPanels: 20,
                recommendedBattery: 1,
                coverage: 110
            },
            technicalSpecs: {
                roofTilt: 35,
                insulationRValue: 30,
                electricalPanelCapacity: 200,
                shadingFactor: 0.92,
                structuralLoad: 'adequate'
            },
            consultantNotes: [],
            lastUpdated: '2026-01-18T14:30:00'
        },
        {
            id: 'proj-002',
            clientName: 'Chen Family',
            status: 'approved',
            priority: 'low',
            submittedDate: '2026-01-15',
            approvedDate: '2026-01-16',
            projectData: {
                people: 3,
                houseSize: 'small',
                appliances: ['A/C Unit', 'Washer/Dryer'],
                roofType: 'hip',
                roofOrientation: -5,
                goalType: 'high_independence',
                estimatedProduction: 4.5,
                estimatedConsumption: 800,
                recommendedPanels: 15,
                recommendedBattery: 1,
                coverage: 95
            }
        },
        {
            id: 'proj-003',
            clientName: 'Patel Project',
            status: 'approved',
            priority: 'low',
            submittedDate: '2026-01-12',
            approvedDate: '2026-01-13',
            projectData: {
                people: 5,
                houseSize: 'large',
                appliances: ['A/C Unit', 'Washer/Dryer', 'Pool Pump', 'Electric Car', 'Water Heater'],
                roofType: 'gable',
                roofOrientation: 0,
                goalType: 'zero_energy',
                estimatedProduction: 9.0,
                estimatedConsumption: 1800,
                recommendedPanels: 28,
                recommendedBattery: 2,
                coverage: 108
            }
        },
        {
            id: 'proj-004',
            clientName: 'Rodriguez Home',
            status: 'needs_review',
            priority: 'medium',
            submittedDate: '2026-01-19',
            projectData: {
                people: 2,
                houseSize: 'small',
                appliances: ['A/C Unit', 'Electric Car'],
                roofType: 'flat',
                roofOrientation: 0,
                goalType: 'cost_savings',
                estimatedProduction: 4.0,
                estimatedConsumption: 650,
                recommendedPanels: 12,
                recommendedBattery: 1,
                coverage: 105
            }
        }
    ],

    systemAlerts: [
        {
            id: 'alert-001',
            clientName: 'Chen Family',
            severity: 'critical',
            type: 'inverter_offline',
            description: 'Inverter Offline',
            details: 'No data received for 2 hours',
            timestamp: '2026-01-20T12:15:00',
            status: 'active'
        },
        {
            id: 'alert-002',
            clientName: 'Patel Project',
            severity: 'warning',
            type: 'low_production',
            description: 'Low Production',
            details: 'Production 30% below forecast',
            timestamp: '2026-01-20T09:00:00',
            status: 'active'
        },
        {
            id: 'alert-003',
            clientName: 'Anderson Home',
            severity: 'info',
            type: 'maintenance_due',
            description: 'Annual Maintenance Due',
            details: 'Scheduled maintenance in 2 weeks',
            timestamp: '2026-01-20T08:00:00',
            status: 'active'
        }
    ],

    platformStats: {
        totalHomes: 1420,
        totalProductionMWh: 3120.5,
        avgIndependence: 88,
        totalCO2Offset: 2450,
        totalSavings: 1850000,
        systemsOnline: 1398,
        systemsOffline: 22,
        activeAlerts: 15
    },

    regionalData: [
        {
            region: 'Central',
            homes: 580,
            production: 1290.5,
            vsForeccast: 12,
            avgIndependence: 92,
            color: '#86efac'
        },
        {
            region: 'West',
            homes: 460,
            production: 1015.8,
            vsForeccast: 4,
            avgIndependence: 87,
            color: '#bbf7d0'
        },
        {
            region: 'North',
            homes: 380,
            production: 814.2,
            vsForeccast: -2,
            avgIndependence: 84,
            color: '#dcfce7'
        }
    ],

    systemTypes: [
        {
            type: 'Grid-Tied',
            percentage: 50,
            count: 710,
            color: '#16a34a'
        },
        {
            type: 'Hybrid',
            percentage: 30,
            count: 426,
            color: '#4ade80'
        },
        {
            type: 'Off-Grid',
            percentage: 20,
            count: 284,
            color: '#bbf7d0'
        }
    ],

    approvalTemplates: [
        {
            id: 'template-1',
            name: 'Standard Approval',
            message: 'Your solar design looks excellent! All technical specifications meet our standards. You\'re cleared to proceed to the next phase.'
        },
        {
            id: 'template-2',
            name: 'Approval with Recommendation',
            message: 'Your design is approved! I recommend considering [RECOMMENDATION] to maximize your system\'s performance.'
        },
        {
            id: 'template-3',
            name: 'Request Revision',
            message: 'Thank you for your submission. I\'ve identified a few areas that need adjustment to ensure optimal performance: [DETAILS]'
        }
    ],

    revisionReasons: [
        'Inadequate roof structure for panel load',
        'Shading concerns not addressed',
        'Electrical panel upgrade required',
        'Insulation improvement recommended',
        'Alternative system sizing suggested',
        'Local code compliance issues',
        'Other (specify in comments)'
    ]
};

class ConsultantCalculator {
    constructor(config) {
        this.config = config;
    }

    getProjectsByStatus(status) {
        return this.config.clientProjects.filter(p => p.status === status);
    }

    getPriorityProjects() {
        return this.config.clientProjects
            .filter(p => p.status === 'needs_review')
            .sort((a, b) => {
                const priority = { high: 3, medium: 2, low: 1 };
                return priority[b.priority] - priority[a.priority];
            });
    }

    getAlertsBySeverity(severity) {
        return this.config.systemAlerts.filter(a => a.severity === severity);
    }

    getWorkloadStats() {
        const needsReview = this.getProjectsByStatus('needs_review').length;
        const approved = this.getProjectsByStatus('approved').length;
        const totalActive = needsReview + approved;
        const criticalAlerts = this.getAlertsBySeverity('critical').length;
        
        return {
            needsReview,
            approved,
            totalActive,
            criticalAlerts,
            completionRate: totalActive > 0 ? Math.round((approved / totalActive) * 100) : 0
        };
    }

    calculateSystemHealth() {
        const stats = this.config.platformStats;
        const onlineRate = (stats.systemsOnline / stats.totalHomes) * 100;
        const alertRate = (stats.activeAlerts / stats.totalHomes) * 100;
        
        let healthScore = 100;
        if (onlineRate < 95) healthScore -= (95 - onlineRate) * 2;
        if (alertRate > 2) healthScore -= (alertRate - 2) * 3;
        
        return Math.max(0, Math.round(healthScore));
    }

    getRegionalInsights() {
        const regions = this.config.regionalData;
        const bestPerforming = regions.reduce((best, region) => 
            region.vsForeccast > best.vsForeccast ? region : best
        );
        const needsAttention = regions.filter(r => r.vsForeccast < 0);
        
        return {
            bestPerforming,
            needsAttention,
            totalRegions: regions.length
        };
    }

    formatProjectData(project) {
        const data = project.projectData;
        return {
            ...project,
            formattedDate: this.formatDate(project.submittedDate),
            statusLabel: this.getStatusLabel(project.status),
            statusColor: this.getStatusColor(project.status),
            priorityLabel: this.getPriorityLabel(project.priority),
            coverageText: `${data.coverage}% Coverage`,
            systemSize: `${data.estimatedProduction} kW`,
            panelCount: `${data.recommendedPanels} panels`
        };
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    }

    getStatusLabel(status) {
        const labels = {
            'needs_review': 'Needs Review',
            'approved': 'Approved',
            'revision_requested': 'Revision Requested',
            'in_progress': 'In Progress'
        };
        return labels[status] || status;
    }

    getStatusColor(status) {
        const colors = {
            'needs_review': 'yellow',
            'approved': 'green',
            'revision_requested': 'orange',
            'in_progress': 'blue'
        };
        return colors[status] || 'gray';
    }

    getPriorityLabel(priority) {
        return priority.charAt(0).toUpperCase() + priority.slice(1);
    }
}
