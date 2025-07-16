
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

interface KPIMetric {
  id: string;
  label: string;
  value: number;
  target: number;
  unit: string;
  icon: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  category: 'performance' | 'engagement' | 'progress' | 'completion';
  description: string;
}

interface LearningModule {
  id: string;
  name: string;
  progress: number;
  timeSpent: number;
  targetTime: number;
  status: 'completed' | 'in-progress' | 'not-started' | 'overdue';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

@Component({
  selector: 'app-kpi-collaborateur',
  templateUrl: './kpi-collaborateur.component.html',
  styleUrls: ['./kpi-collaborateur.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' }))
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})
export class KpiCollaborateurComponent implements OnInit {
  viewMode: 'cards' | 'table' | 'dashboard' = 'dashboard';
  chartView: 'detailed' | 'summary' = 'detailed';
  selectedPeriod = '30';
  selectedCategory = '';
  
  // Enhanced categories with colors
  categories = [
    { name: 'Leadership', color: '#667eea', icon: '👑' },
    { name: 'Technique', color: '#764ba2', icon: '🔧' },
    { name: 'RH', color: '#f093fb', icon: '👥' },
    { name: 'Soft Skills', color: '#4facfe', icon: '💡' }
  ];

  // Enhanced KPI metrics
  kpiMetrics: KPIMetric[] = [
    {
      id: 'completion-rate',
      label: 'Taux de Complétion',
      value: 87,
      target: 85,
      unit: '%',
      icon: '🎯',
      trend: 'up',
      trendValue: 5.2,
      category: 'completion',
      description: 'Pourcentage de formations terminées avec succès'
    },
    {
      id: 'engagement-score',
      label: 'Score d\'Engagement',
      value: 92,
      target: 80,
      unit: '/100',
      icon: '⚡',
      trend: 'up',
      trendValue: 8.1,
      category: 'engagement',
      description: 'Niveau d\'interaction et de participation'
    },
    {
      id: 'learning-velocity',
      label: 'Vélocité d\'Apprentissage',
      value: 15,
      target: 12,
      unit: 'h/semaine',
      icon: '🚀',
      trend: 'up',
      trendValue: 12.5,
      category: 'performance',
      description: 'Heures d\'apprentissage par semaine'
    },
    {
      id: 'skill-progression',
      label: 'Progression des Compétences',
      value: 78,
      target: 75,
      unit: '%',
      icon: '📈',
      trend: 'stable',
      trendValue: 0.8,
      category: 'progress',
      description: 'Amélioration globale des compétences'
    },
    {
      id: 'retention-rate',
      label: 'Taux de Rétention',
      value: 94,
      target: 90,
      unit: '%',
      icon: '🔄',
      trend: 'up',
      trendValue: 3.2,
      category: 'engagement',
      description: 'Collaborateurs qui continuent leur formation'
    },
    {
      id: 'assessment-score',
      label: 'Score d\'Évaluation',
      value: 83,
      target: 80,
      unit: '/100',
      icon: '🧠',
      trend: 'up',
      trendValue: 4.7,
      category: 'performance',
      description: 'Performance moyenne aux évaluations'
    }
  ];

  // Learning modules data
  learningModules: LearningModule[] = [
    {
      id: 'leadership-fundamentals',
      name: 'Fondamentaux du Leadership',
      progress: 85,
      timeSpent: 24,
      targetTime: 30,
      status: 'in-progress',
      difficulty: 'intermediate',
      category: 'Leadership'
    },
    {
      id: 'technical-skills',
      name: 'Compétences Techniques',
      progress: 92,
      timeSpent: 45,
      targetTime: 40,
      status: 'completed',
      difficulty: 'advanced',
      category: 'Technique'
    },
    {
      id: 'communication',
      name: 'Communication Efficace',
      progress: 67,
      timeSpent: 18,
      targetTime: 25,
      status: 'in-progress',
      difficulty: 'beginner',
      category: 'Soft Skills'
    },
    {
      id: 'hr-policies',
      name: 'Politiques RH',
      progress: 100,
      timeSpent: 20,
      targetTime: 20,
      status: 'completed',
      difficulty: 'intermediate',
      category: 'RH'
    }
  ];

  // Chart configurations
  progressChart: EChartsOption = {};
  skillsRadarChart: EChartsOption = {};
  timeDistributionChart: EChartsOption = {};
  performanceTrendChart: EChartsOption = {};

  ngOnInit(): void {
    this.initializeCharts();
  }

  initializeCharts(): void {
    this.progressChart = {
      title: {
        text: 'Progression par Compétence',
        left: 'center',
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#2c3e50'
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#667eea',
        borderWidth: 1
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '10%',
        top: '20%'
      },
      xAxis: {
        type: 'category',
        data: this.learningModules.map(m => m.name.split(' ')[0]),
        axisLabel: {
          rotate: 45,
          color: '#666'
        }
      },
      yAxis: {
        type: 'value',
        max: 100,
        axisLabel: {
          formatter: '{value}%'
        }
      },
      series: [{
        name: 'Progression',
        type: 'bar',
        data: this.learningModules.map(m => m.progress),
        itemStyle: {
          color: function(params: any) {
            const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];
            return colors[params.dataIndex % colors.length];
          }
        },
        barWidth: '60%',
        animationDuration: 1500
      }]
    };

    this.skillsRadarChart = {
      title: {
        text: 'Radar des Compétences',
        left: 'center',
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#2c3e50'
        }
      },
      tooltip: {},
      radar: {
        indicator: [
          { name: 'Leadership', max: 100 },
          { name: 'Technique', max: 100 },
          { name: 'Communication', max: 100 },
          { name: 'RH', max: 100 },
          { name: 'Innovation', max: 100 },
          { name: 'Gestion', max: 100 }
        ]
      },
      series: [{
        name: 'Compétences',
        type: 'radar',
        data: [{
          value: [85, 92, 67, 100, 75, 88],
          name: 'Niveau Actuel',
          areaStyle: {
            color: 'rgba(102, 126, 234, 0.3)'
          }
        }]
      }]
    };

    this.timeDistributionChart = {
      title: {
        text: 'Répartition du Temps d\'Apprentissage',
        left: 'center',
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#2c3e50'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}h ({d}%)'
      },
      series: [{
        name: 'Temps',
        type: 'pie',
        radius: ['40%', '70%'],
        data: this.categories.map((cat, index) => ({
          value: [24, 45, 18, 20][index],
          name: cat.name,
          itemStyle: { color: cat.color }
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };

    this.performanceTrendChart = {
      title: {
        text: 'Tendance de Performance',
        left: 'center',
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#2c3e50'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '10%',
        top: '20%'
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun']
      },
      yAxis: {
        type: 'value',
        max: 100
      },
      series: [{
        name: 'Performance',
        type: 'line',
        data: [65, 72, 78, 83, 87, 92],
        smooth: true,
        lineStyle: {
          color: '#667eea',
          width: 3
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(102, 126, 234, 0.6)' },
              { offset: 1, color: 'rgba(102, 126, 234, 0.1)' }
            ]
          }
        }
      }]
    };
  }

  // Getters for filtered data
  get filteredKpiMetrics(): KPIMetric[] {
    if (!this.selectedCategory) return this.kpiMetrics;
    return this.kpiMetrics.filter(kpi => 
      kpi.category === this.selectedCategory.toLowerCase()
    );
  }

  get filteredLearningModules(): LearningModule[] {
    if (!this.selectedCategory) return this.learningModules;
    return this.learningModules.filter(module => 
      module.category === this.selectedCategory
    );
  }

  // Methods
  toggleView(): void {
    const modes = ['dashboard', 'cards', 'table'];
    const currentIndex = modes.indexOf(this.viewMode);
    this.viewMode = modes[(currentIndex + 1) % modes.length] as any;
  }

  toggleChartView(): void {
    this.chartView = this.chartView === 'detailed' ? 'summary' : 'detailed';
  }

  setCategory(category: string): void {
    this.selectedCategory = this.selectedCategory === category ? '' : category;
  }

  getStatusColor(status: string): string {
    const colors = {
      'completed': '#28a745',
      'in-progress': '#ffc107',
      'not-started': '#6c757d',
      'overdue': '#dc3545'
    };
    return colors[status as keyof typeof colors] || '#6c757d';
  }

  getDifficultyIcon(difficulty: string): string {
    const icons = {
      'beginner': '🌱',
      'intermediate': '🌿',
      'advanced': '🌳'
    };
    return icons[difficulty as keyof typeof icons] || '📚';
  }

  getTrendIcon(trend: string): string {
    const icons = {
      'up': '📈',
      'down': '📉',
      'stable': '➡️'
    };
    return icons[trend as keyof typeof icons] || '➡️';
  }

  exportData(): void {
    console.log('Exporting KPI data...');
    // Implementation for export functionality
  }

  scheduleReview(): void {
    console.log('Scheduling performance review...');
    // Implementation for scheduling functionality
  }

  trackKpiById(index: number, kpi: KPIMetric): string {
    return kpi.id;
  }

  trackModuleById(index: number, module: LearningModule): string {
    return module.id;
  }

  getCategoryColor(categoryName: string): string {
    const category = this.categories.find(cat => cat.name === categoryName);
    return category ? category.color : '#6c757d';
  }

  getStatusLabel(status: string): string {
    const labels = {
      'completed': 'Terminé',
      'in-progress': 'En cours',
      'not-started': 'Pas commencé',
      'overdue': 'En retard'
    };
    return labels[status as keyof typeof labels] || status;
  }
}
