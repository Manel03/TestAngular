import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-kpi-manager',
  templateUrl: './kpi-manager.component.html',
  styleUrls: ['./kpi-manager.component.scss']
})
export class KpiManagerComponent implements OnInit {
  teamCompletionChart: EChartsOption = {};
  feedbackChart: EChartsOption = {};

  ngOnInit(): void {
    this.teamCompletionChart = {
      title: { text: 'Complétion par membre', left: 'center' },
      xAxis: { type: 'category', data: ['Alice', 'Bob', 'Claire', 'David'] },
      yAxis: { type: 'value' },
      series: [{
        data: [78, 92, 85, 60],
        type: 'bar'
      }]
    };

    this.feedbackChart = {
      title: { text: 'Note moyenne de l\'équipe', left: 'center' },
      xAxis: { type: 'category', data: ['Jan', 'Fév', 'Mar', 'Avr'] },
      yAxis: { type: 'value' },
      series: [{
        data: [4.1, 4.4, 4.0, 4.5],
        type: 'line'
      }]
    };
  }
}
