import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import {  trigger,  state,  style,  transition,  animate,  query,  stagger} from '@angular/animations';

@Component({
  selector: 'app-kpi-collaborateur',
  templateUrl: './kpi-collaborateur.component.html',
  styleUrls: ['./kpi-collaborateur.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class KpiCollaborateurComponent {
  viewMode: 'table' | 'cards' = 'cards';
  viewMode2: 'detailed' | 'pie' = 'detailed'; 

  toggleView(): void {
  this.viewMode = this.viewMode === 'cards' ? 'table' : 'cards';
  } 
  completionChart: EChartsOption = {
  tooltip: {},
  xAxis: {
    data: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai']
  },
  yAxis: {},
  dataZoom: [
    {
      type: 'slider',
      start: 0,
      end: 100
    }
  ],
  series: [
    {
      name: 'Progression',
      type: 'line' as const,
      data: [70, 75, 80, 86, 83],
      areaStyle: {}, 
      animationDuration: 1000, 
      animationEasing: 'cubicOut'
    }
  ]
};
satisfactionChart: EChartsOption = {
  
  tooltip: {
    trigger: 'item' as const,
    formatter: '{b}: {d}%',
  },
  legend: {
    orient: 'horizontal' as const,
    top: 'bottom',
    left: 'center',
    itemGap: 20,
    icon: 'circle',
    textStyle: {
      fontSize: 14,
      color: '#444'
    }
  },
  series: [
    {
      name: 'Satisfaction',
      type: 'pie' as const,
      radius: '55%',
      center: ['50%', '50%'],
      label: {
        show: true,
        formatter: '{b}: {d}%',
        fontSize: 13
      },
      labelLine: {
        length: 15,
        length2: 10
      },
      data: [
        { value: 10, name: 'Insatisfait', itemStyle: { color: '#5470C6' } },
        { value: 20, name: 'Peu satisfait', itemStyle: { color: '#91cc75' } },
        { value: 30, name: 'Satisfait', itemStyle: { color: '#fac858' } },
        { value: 40, name: 'Très Satisfait', itemStyle: { color: '#ee6666' } }
      ]
    }
  ]
};

selectedPeriod = '30';
  selectedCategory = '';
  categories = ['Leadership', 'Technique', 'RH', 'Soft Skills'];
  kpiSupplementaires = [
  { icon: '💡', label: 'Taux d’engagement', value: '85%', category: 'Leadership' },
  { icon: '📈', label: 'Croissance des interactions', value: '+15%', category: 'Leadership' },
  { icon: '📚', label: 'Formations suivies', value: '24', category: 'Soft Skills' },
  { icon: '👨‍🏫', label: 'Formateurs impliqués', value: '5', category: 'RH' },
  { icon: '📅', label: 'Assiduité mensuelle', value: '88%', category: 'Technique' },
  { icon: '🕒', label: 'Heures de formation', value: '42h', category: 'Technique' }
];

get filteredKpiData() {
  return this.kpiSupplementaires.filter(kpi =>
    !this.selectedCategory || kpi.category === this.selectedCategory
  );
}
get kpiFiltres() {
  if (this.selectedCategory === '' || this.selectedCategory === 'Tous') {
    return this.kpiSupplementaires;
  }
  return this.kpiSupplementaires.filter(kpi => kpi.category === this.selectedCategory);
}

setCategory(cat: string) {
  this.selectedCategory = cat;
}
 progressionOption: EChartsOption = {
    title: {
      text: 'Progression mensuelle',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis' as const // 👈 valeur littérale requise
    },
    xAxis: {
      type: 'category' as const,
      data: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai']
    },
    yAxis: {
      type: 'value' as const,
      max: 100
    },
    series: [
      {
        name: 'Progression',
        type: 'line' as const,
        areaStyle: {},
        data: [70, 75, 80, 85, 82]
      }
    ]
  };

  score = {
    valeur: 76,
    seuil: 80
  };
tempsParModule = [
  { nom: 'Leadership', temps: 12, objectif: 10 },
  { nom: 'Techniques', temps: 18, objectif: 15 },
  { nom: 'RH', temps: 8, objectif: 10 },
  { nom: 'Soft Skills', temps: 4, objectif: 8 }
];
 getModulesASurveiller(): string[] {
    return this.tempsParModule
      .filter(m => m.temps < m.objectif)
      .map(m => m.nom);
  }
  // Autres données KPI à afficher dynamiquement
kpisSupp = [
  { label: 'Taux d’engagement', value: '85%', icon: '💡' },
  { label: 'Croissance des interactions', value: '+15%', icon: '📈' },
  { label: 'Assiduité mensuelle', value: '88%', icon: '📅' },
  { label: 'Formations suivies', value: '24', icon: '📚' },
  { label: 'Formateurs impliqués', value: '5', icon: '🧑‍🏫' },
  { label: 'Heures de formation', value: '42h', icon: '⏱️' }
];
 get pieOption(): EChartsOption {
    const ok = this.tempsParModule.filter(m => m.temps >= m.objectif).length;
    const surveiller = this.tempsParModule.length - ok;

    return {
      title: {
        text: 'État des modules',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: 10,
        left: 'center'
      },
      series: [
        {
          name: 'Modules',
          type: 'pie',
          radius: '50%',
          data: [
            { value: ok, name: 'OK ✅' },
            { value: surveiller, name: 'À surveiller ⚠️' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }

  toggleView2() {
    this.viewMode2 = this.viewMode2 === 'detailed' ? 'pie' : 'detailed';
  }

}
