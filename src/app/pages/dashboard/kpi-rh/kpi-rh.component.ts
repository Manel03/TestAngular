import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-kpi-rh',
  templateUrl: './kpi-rh.component.html',
  styleUrls: ['./kpi-rh.component.scss']
})
export class KpiRhComponent implements OnInit {
  globalParticipationChart: EChartsOption = {};
  monthlyTrainingsChart: EChartsOption = {};

  ngOnInit(): void {
    this.globalParticipationChart = {
      title: { text: 'Participation par département', left: 'center' },
      xAxis: { type: 'category', data: ['RH', 'Tech', 'Commerce', 'Admin'] },
      yAxis: { type: 'value' },
      series: [{
        data: [76, 82, 70, 60],
        type: 'bar'
      }]
    };

    this.monthlyTrainingsChart = {
      title: { text: 'Formations mensuelles', left: 'center' },
      xAxis: { type: 'category', data: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai'] },
      yAxis: { type: 'value' },
      series: [{
        data: [10, 12, 8, 14, 11],
        type: 'line',
        smooth: true
      }]
    };
  }
}
