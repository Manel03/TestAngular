
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

interface RhKPI {
  id: string;
  label: string;
  value: number;
  target: number;
  unit: string;
  icon: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  description: string;
}

interface DepartmentData {
  name: string;
  completionRate: number;
  avgScore: number;
  participation: number;
  retention: number;
}

interface AlertCollaborator {
  id: string;
  name: string;
  department: string;
  status: 'inactive' | 'at-risk';
  lastActivity: Date;
  completionRate: number;
}

@Component({
  selector: 'app-kpi-rh',
  templateUrl: './kpi-rh.component.html',
  styleUrls: ['./kpi-rh.component.scss']
})
export class KpiRhComponent implements OnInit {
  // Chart configurations
  globalCompletionChart: EChartsOption = {};
  departmentComparisonChart: EChartsOption = {};
  progressTrendChart: EChartsOption = {};
  participationFrequencyChart: EChartsOption = {};
  topThemesChart: EChartsOption = {};
  retentionChart: EChartsOption = {};
  geographicChart: EChartsOption = {};

  // RH KPIs data
  rhKPIs: RhKPI[] = [
    {
      id: 'global-completion',
      label: 'Taux de Complétion Global',
      value: 78,
      target: 85,
      unit: '%',
      icon: '📊',
      trend: 'up',
      trendValue: 5.2,
      description: 'Pourcentage global de formations terminées'
    },
    {
      id: 'global-progression',
      label: 'Progression Globale',
      value: 82,
      target: 80,
      unit: '%',
      icon: '📈',
      trend: 'up',
      trendValue: 3.8,
      description: 'Évolution moyenne des collaborateurs'
    },
    {
      id: 'avg-evaluation-score',
      label: 'Score Moyen Évaluations',
      value: 84,
      target: 85,
      unit: '/100',
      icon: '🎯',
      trend: 'down',
      trendValue: -1.2,
      description: 'Note moyenne aux évaluations'
    },
    {
      id: 'monthly-participation',
      label: 'Participation Mensuelle',
      value: 156,
      target: 150,
      unit: '',
      icon: '👥',
      trend: 'up',
      trendValue: 8.5,
      description: 'Nombre de participants par mois'
    },
    {
      id: 'retention-rate',
      label: 'Taux de Rétention',
      value: 91,
      target: 90,
      unit: '%',
      icon: '🔄',
      trend: 'up',
      trendValue: 2.1,
      description: 'Maintien dans le parcours formation'
    },
    {
      id: 'at-risk-collaborators',
      label: 'Collaborateurs à Risque',
      value: 12,
      target: 5,
      unit: '',
      icon: '⚠️',
      trend: 'down',
      trendValue: -15.3,
      description: 'Collaborateurs inactifs ou en difficulté'
    }
  ];

  // Department data
  departmentData: DepartmentData[] = [
    { name: 'RH', completionRate: 85, avgScore: 88, participation: 95, retention: 92 },
    { name: 'Tech', completionRate: 82, avgScore: 86, participation: 78, retention: 89 },
    { name: 'Commerce', completionRate: 70, avgScore: 82, participation: 85, retention: 88 },
    { name: 'Admin', completionRate: 65, avgScore: 80, participation: 72, retention: 85 },
    { name: 'Finance', completionRate: 88, avgScore: 90, participation: 88, retention: 94 }
  ];

  // Alert collaborators
  alertCollaborators: AlertCollaborator[] = [
    {
      id: '1',
      name: 'Jean Dupont',
      department: 'Commerce',
      status: 'inactive',
      lastActivity: new Date('2024-01-10'),
      completionRate: 45
    },
    {
      id: '2',
      name: 'Marie Martin',
      department: 'Admin',
      status: 'at-risk',
      lastActivity: new Date('2024-01-15'),
      completionRate: 38
    },
    {
      id: '3',
      name: 'Pierre Durand',
      department: 'Tech',
      status: 'inactive',
      lastActivity: new Date('2024-01-08'),
      completionRate: 52
    }
  ];

  ngOnInit(): void {
    this.initializeCharts();
  }

  initializeCharts(): void {
    // Global completion by department
    this.globalCompletionChart = {
      title: {
        text: 'Taux de Complétion par Service',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c}%'
      },
      xAxis: {
        type: 'category',
        data: this.departmentData.map(d => d.name)
      },
      yAxis: {
        type: 'value',
        max: 100,
        axisLabel: { formatter: '{value}%' }
      },
      series: [{
        data: this.departmentData.map(d => d.completionRate),
        type: 'bar',
        itemStyle: {
          color: (params: any) => {
            const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
            return colors[params.dataIndex % colors.length];
          }
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}%'
        }
      }]
    };

    // Department comparison radar
    this.departmentComparisonChart = {
      title: {
        text: 'Comparaison entre Départements',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: {},
      radar: {
        indicator: [
          { name: 'Complétion', max: 100 },
          { name: 'Score Moyen', max: 100 },
          { name: 'Participation', max: 100 },
          { name: 'Rétention', max: 100 }
        ]
      },
      series: [{
        type: 'radar',
        data: this.departmentData.slice(0, 3).map((dept, index) => ({
          value: [dept.completionRate, dept.avgScore, dept.participation, dept.retention],
          name: dept.name,
          areaStyle: {
            color: `rgba(${index === 0 ? '52, 152, 219' : 
                          index === 1 ? '155, 89, 182' : '231, 76, 60'}, 0.3)`
          }
        }))
      }]
    };

    // Progression trend
    this.progressTrendChart = {
      title: {
        text: 'Progression Globale des Collaborateurs',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun']
      },
      yAxis: { type: 'value', max: 100 },
      series: [{
        data: [72, 75, 78, 80, 82, 84],
        type: 'line',
        smooth: true,
        itemStyle: { color: '#27ae60' },
        areaStyle: { color: 'rgba(39, 174, 96, 0.1)' }
      }]
    };

    // Monthly participation frequency
    this.participationFrequencyChart = {
      title: {
        text: 'Fréquence Mensuelle de Participation',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun']
      },
      yAxis: { type: 'value' },
      series: [{
        data: [120, 135, 145, 156, 162, 175],
        type: 'bar',
        itemStyle: { color: '#3498db' }
      }]
    };

    // Top themes
    this.topThemesChart = {
      title: {
        text: 'Thématiques les plus Suivies',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 35, name: 'Leadership', itemStyle: { color: '#e74c3c' } },
          { value: 28, name: 'Techniques', itemStyle: { color: '#3498db' } },
          { value: 22, name: 'Soft Skills', itemStyle: { color: '#2ecc71' } },
          { value: 18, name: 'Sécurité', itemStyle: { color: '#f39c12' } },
          { value: 15, name: 'Digital', itemStyle: { color: '#9b59b6' } }
        ]
      }]
    };

    // Retention rate
    this.retentionChart = {
      title: {
        text: 'Taux de Rétention par Parcours',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['Parcours 1', 'Parcours 2', 'Parcours 3', 'Parcours 4']
      },
      yAxis: { type: 'value', max: 100 },
      series: [{
        data: [92, 88, 95, 87],
        type: 'bar',
        itemStyle: { color: '#16a085' }
      }]
    };

    // Geographic distribution
    this.geographicChart = {
      title: {
        text: 'Suivi par Zone Géographique',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux']
      },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'Participants',
          data: [45, 32, 28, 25, 22],
          type: 'bar',
          itemStyle: { color: '#8e44ad' }
        },
        {
          name: 'Taux complétion',
          data: [85, 78, 82, 75, 80],
          type: 'line',
          yAxisIndex: 0,
          itemStyle: { color: '#e67e22' }
        }
      ]
    };
  }

  // Utility methods
  getDaysInactive(lastActivity: Date): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastActivity.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getStatusLabel(status: string): string {
    return status === 'inactive' ? 'Inactif' : 'À Risque';
  }

  contactCollaborator(id: string): void {
    console.log(`Contacting collaborator with ID: ${id}`);
    // Implementation for contacting collaborator
  }

  exportToExcel(): void {
    console.log('Exporting RH data to Excel...');
    // Implementation for Excel export
  }

  exportToPDF(): void {
    console.log('Exporting RH data to PDF...');
    // Implementation for PDF export
  }

  get totalCollaborators(): number {
    return this.departmentData.reduce((sum, dept) => sum + dept.participation, 0);
  }

  get averageCompletionRate(): number {
    return Math.round(
      this.departmentData.reduce((sum, dept) => sum + dept.completionRate, 0) / 
      this.departmentData.length
    );
  }

  get averageTimeBetweenTrainings(): number {
    return 18; // days - could be calculated from real data
  }
}
