
class ConsultantApp {
    constructor() {
        this.calculator = new ConsultantCalculator(ConsultantData);
        this.currentProject = null;
        this.init();
    }

    init() {
        this.setupNavigation();
        this.renderValidationDashboard();
        this.renderAnalyticsDashboard();
        this.setupEventListeners();
    }

    setupNavigation() {
        const nav = document.getElementById('consultant-nav');
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

    renderValidationDashboard() {
        this.renderProjectList();
        this.renderSystemAlerts();
        this.renderProjectDetails();
        this.updateWorkloadBadge();
    }

    renderProjectList() {
        const container = document.getElementById('client-projects-list');
        if (!container) return;

        const projects = this.calculator.getPriorityProjects();
        const approved = this.calculator.getProjectsByStatus('approved').slice(0, 2);
        
        container.innerHTML = '';

        projects.forEach(project => {
            const formatted = this.calculator.formatProjectData(project);
            const div = document.createElement('li');
            div.innerHTML = `
                <a href="#" class="project-card block p-3 rounded-lg bg-yellow-100 border-2 border-yellow-300 hover:border-yellow-400 transition-all" data-project-id="${project.id}">
                    <div class="flex justify-between items-start">
                        <h4 class="font-bold text-gray-800">${project.clientName}</h4>
                        ${project.priority === 'high' ? '<span class="text-xs bg-red-500 text-white px-2 py-1 rounded">High Priority</span>' : ''}
                    </div>
                    <div class="flex justify-between items-center mt-1">
                        <span class="text-sm text-yellow-800">Status: ${formatted.statusLabel}</span>
                        <span class="text-xs text-gray-600">${formatted.formattedDate}</span>
                    </div>
                </a>
            `;
            container.appendChild(div);
        });

        approved.forEach(project => {
            const formatted = this.calculator.formatProjectData(project);
            const div = document.createElement('li');
            div.innerHTML = `
                <a href="#" class="project-card block p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all" data-project-id="${project.id}">
                    <h4 class="font-bold text-gray-800">${project.clientName}</h4>
                    <span class="text-sm text-green-700">Status: ${formatted.statusLabel}</span>
                </a>
            `;
            container.appendChild(div);
        });
    }

    renderSystemAlerts() {
        const container = document.getElementById('system-alerts-list');
        if (!container) return;

        const alerts = ConsultantData.systemAlerts.slice(0, 3);
        container.innerHTML = '';
        
        alerts.forEach(alert => {
            const div = document.createElement('div');
            const bgColor = alert.severity === 'critical' ? 'bg-red-100 border-red-300' : 
                           alert.severity === 'warning' ? 'bg-yellow-100 border-yellow-300' : 
                           'bg-blue-100 border-blue-300';
            const textColor = alert.severity === 'critical' ? 'text-red-800' : 
                             alert.severity === 'warning' ? 'text-yellow-800' : 
                             'text-blue-800';
            
            div.className = `p-3 ${bgColor} border rounded-lg cursor-pointer hover:shadow-md transition-all`;
            div.innerHTML = `
                <p class="font-medium ${textColor}">${alert.clientName}: ${alert.description}</p>
                <p class="text-sm ${textColor.replace('800', '700')}">${alert.details}</p>
            `;
            container.appendChild(div);
        });
    }

    renderProjectDetails() {

        const projects = this.calculator.getPriorityProjects();
        if (projects.length > 0) {
            this.loadProjectDetails(projects[0].id);
        }
    }

    loadProjectDetails(projectId) {
        const project = ConsultantData.clientProjects.find(p => p.id === projectId);
        if (!project) return;
        
        this.currentProject = project;

        const header = document.getElementById('project-header');
        if (header) {
            header.textContent = `Review: ${project.clientName} Project`;
        }

        const selections = document.getElementById('homeowner-selections');
        if (selections) {
            const data = project.projectData;
            selections.innerHTML = `
                <li>👥 ${data.people} People, ${this.capitalize(data.houseSize)} House</li>
                <li>⚡ Appliances: ${data.appliances.join(', ')}</li>
                <li>🎯 Goal: ${this.formatGoal(data.goalType)}</li>
                <li>🏠 Roof: ${this.capitalize(data.roofType)}, ${data.roofOrientation}° Orientation</li>
                <li>☀️ System: ${data.recommendedPanels} panels (${data.estimatedProduction} kW)</li>
                <li>🔋 Battery: ${data.recommendedBattery} unit(s)</li>
                <li>📊 Coverage: ${data.coverage}%</li>
            `;
        }

        if (project.technicalSpecs) {
            this.renderTechnicalSpecs(project.technicalSpecs);
        }
    }

    renderTechnicalSpecs(specs) {
        const tbody = document.getElementById('technical-specs-tbody');
        if (!tbody) return;
        
        tbody.innerHTML = `
            <tr>
                <td class="p-2 border font-medium">Roof Tilt</td>
                <td class="p-2 border">${specs.roofTilt}°</td>
                <td class="p-2 border">
                    <input type="text" class="w-full p-1 border rounded text-sm" placeholder="Good orientation for solar..." value="${specs.roofTilt >= 30 && specs.roofTilt <= 40 ? 'Optimal angle for this latitude' : 'Within acceptable range'}">
                </td>
            </tr>
            <tr>
                <td class="p-2 border font-medium">Insulation R-Value</td>
                <td class="p-2 border">R-${specs.insulationRValue}</td>
                <td class="p-2 border">
                    <input type="text" class="w-full p-1 border rounded text-sm" placeholder="Consider upgrading..." value="${specs.insulationRValue >= 40 ? 'Excellent insulation' : 'Recommend R-40 for better efficiency'}">
                </td>
            </tr>
            <tr>
                <td class="p-2 border font-medium">Electrical Panel</td>
                <td class="p-2 border">${specs.electricalPanelCapacity}A</td>
                <td class="p-2 border">
                    <input type="text" class="w-full p-1 border rounded text-sm" placeholder="Panel capacity notes..." value="${specs.electricalPanelCapacity >= 200 ? 'Adequate capacity' : 'May require upgrade'}">
                </td>
            </tr>
            <tr>
                <td class="p-2 border font-medium">Shading Factor</td>
                <td class="p-2 border">${(specs.shadingFactor * 100).toFixed(0)}%</td>
                <td class="p-2 border">
                    <input type="text" class="w-full p-1 border rounded text-sm" placeholder="Shading analysis..." value="${specs.shadingFactor >= 0.9 ? 'Minimal shading - excellent' : 'Some shading concerns'}">
                </td>
            </tr>
            <tr>
                <td class="p-2 border font-medium">Structural Load</td>
                <td class="p-2 border">${this.capitalize(specs.structuralLoad)}</td>
                <td class="p-2 border">
                    <input type="text" class="w-full p-1 border rounded text-sm" placeholder="Structural notes..." value="Roof structure can support panel installation">
                </td>
            </tr>
        `;
    }

    renderAnalyticsDashboard() {
        this.renderPlatformStats();
        this.renderRegionalPerformance();
        this.renderSystemTypes();
    }

    renderPlatformStats() {
        const stats = ConsultantData.platformStats;
        
        const elements = {
            totalHomes: document.getElementById('stat-total-homes'),
            totalProduction: document.getElementById('stat-total-production'),
            avgIndependence: document.getElementById('stat-avg-independence'),
            systemsOnline: document.getElementById('stat-systems-online'),
            totalSavings: document.getElementById('stat-total-savings'),
            co2Offset: document.getElementById('stat-co2-offset')
        };
        
        if (elements.totalHomes) elements.totalHomes.textContent = stats.totalHomes.toLocaleString();
        if (elements.totalProduction) elements.totalProduction.textContent = stats.totalProductionMWh.toLocaleString();
        if (elements.avgIndependence) elements.avgIndependence.textContent = stats.avgIndependence;
        if (elements.systemsOnline) elements.systemsOnline.textContent = `${stats.systemsOnline} / ${stats.totalHomes}`;
        if (elements.totalSavings) elements.totalSavings.textContent = `$${(stats.totalSavings / 1000000).toFixed(1)}M`;
        if (elements.co2Offset) elements.co2Offset.textContent = `${stats.totalCO2Offset.toLocaleString()} tons`;
    }

    renderRegionalPerformance() {
        const container = document.getElementById('regional-performance-list');
        if (!container) return;
        
        container.innerHTML = '';
        ConsultantData.regionalData.forEach(region => {
            const li = document.createElement('li');
            const color = region.vsForeccast >= 0 ? 'text-green-600' : 'text-red-500';
            const sign = region.vsForeccast >= 0 ? '+' : '';
            li.className = 'flex justify-between items-center';
            li.innerHTML = `
                <span class="font-medium">${region.region}</span>
                <span class="${color} font-semibold">${sign}${region.vsForeccast}%</span>
            `;
            container.appendChild(li);
        });
    }

    renderSystemTypes() {
        const container = document.getElementById('system-types-list');
        if (!container) return;
        
        container.innerHTML = '';
        ConsultantData.systemTypes.forEach(system => {
            const li = document.createElement('li');
            li.className = 'text-gray-600 text-sm';
            li.innerHTML = `
                <span class="inline-block w-3 h-3 rounded-full mr-2" style="background-color: ${system.color}"></span>
                ${system.percentage}% - ${system.type} (${system.count})
            `;
            container.appendChild(li);
        });
    }

    setupEventListeners() {

        document.addEventListener('click', (e) => {
            const projectCard = e.target.closest('.project-card');
            if (projectCard) {
                e.preventDefault();
                const projectId = projectCard.getAttribute('data-project-id');
                this.loadProjectDetails(projectId);
                projectCard.classList.add('ring-2', 'ring-green-500');
                setTimeout(() => projectCard.classList.remove('ring-2', 'ring-green-500'), 1000);
            }
        });

        const approveBtn = document.getElementById('approve-btn');
        if (approveBtn) {
            approveBtn.addEventListener('click', () => this.approveProject());
        }

        const revisionBtn = document.getElementById('revision-btn');
        if (revisionBtn) {
            revisionBtn.addEventListener('click', () => this.requestRevision());
        }

        document.querySelectorAll('[data-template]').forEach(btn => {
            btn.addEventListener('click', () => {
                const template = btn.getAttribute('data-template');
                this.applyTemplate(template);
            });
        });
    }

    approveProject() {
        if (!this.currentProject) return;
        
        const comments = document.getElementById('consultant-comments');
        const commentText = comments ? comments.value : '';

        this.currentProject.status = 'approved';
        this.currentProject.approvedDate = new Date().toISOString();
        this.currentProject.consultantNotes.push({
            type: 'approval',
            text: commentText,
            timestamp: new Date().toISOString()
        });

        this.showNotification('✅ Project Approved!', `${this.currentProject.clientName}'s project has been approved and they've been notified.`, 'success');

        this.renderProjectList();
        this.updateWorkloadBadge();

        const nextProjects = this.calculator.getPriorityProjects();
        if (nextProjects.length > 0) {
            setTimeout(() => this.loadProjectDetails(nextProjects[0].id), 1500);
        }
    }

    requestRevision() {
        if (!this.currentProject) return;
        
        const comments = document.getElementById('consultant-comments');
        const commentText = comments ? comments.value : '';
        
        if (!commentText.trim()) {
            this.showNotification('⚠️ Comments Required', 'Please provide specific feedback for revision.', 'warning');
            return;
        }

        this.currentProject.status = 'revision_requested';
        this.currentProject.consultantNotes.push({
            type: 'revision',
            text: commentText,
            timestamp: new Date().toISOString()
        });
        
        this.showNotification('📝 Revision Requested', `${this.currentProject.clientName} will receive your feedback.`, 'info');

        this.renderProjectList();
        this.updateWorkloadBadge();
    }

    applyTemplate(templateId) {
        const template = ConsultantData.approvalTemplates.find(t => t.id === templateId);
        if (!template) return;
        
        const comments = document.getElementById('consultant-comments');
        if (comments) {
            comments.value = template.message;
        }
    }

    showNotification(title, message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            success: 'bg-green-600',
            error: 'bg-red-600',
            warning: 'bg-yellow-600',
            info: 'bg-blue-600'
        };
        
        notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-4 rounded-xl shadow-2xl z-50 max-w-md animate-slide-in`;
        notification.innerHTML = `
            <h4 class="font-bold text-lg mb-1">${title}</h4>
            <p class="text-sm">${message}</p>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    updateWorkloadBadge() {
        const stats = this.calculator.getWorkloadStats();
        const badge = document.querySelector('[data-target="consultant-task5"]');
        if (badge && stats.needsReview > 0) {
            const existing = badge.querySelector('.needs-review-badge');
            if (existing) {
                existing.textContent = stats.needsReview;
            } else {
                const span = document.createElement('span');
                span.className = 'needs-review-badge inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-yellow-600 rounded-full ml-2';
                span.textContent = stats.needsReview;
                badge.appendChild(span);
            }
        }
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    formatGoal(goal) {
        const goals = {
            'zero_energy': 'Net Zero Energy',
            'high_independence': 'High Independence',
            'cost_savings': 'Maximum Savings'
        };
        return goals[goal] || goal;
    }
}

if (window.location.pathname.includes('consultant.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        window.consultantApp = new ConsultantApp();
    });
}
