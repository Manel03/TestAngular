import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as ExcelJS from 'exceljs/dist/exceljs.min.js';
import * as FileSaver from 'file-saver';
import { html2pdf } from 'html2pdf.js';

interface ManagerKPI {
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

@Component({
  selector: 'app-kpi-manager',
  templateUrl: './kpi-manager.component.html',
  styleUrls: ['./kpi-manager.component.scss']
})
export class KpiManagerComponent implements OnInit {
  managerKPIs: ManagerKPI[] = [
    // Your KPI data here
  ];
  
  // Define chart properties
  globalCompletionChart: EChartsOption = {}; // Initialize to an empty object
  departmentComparisonChart: EChartsOption = {}; // Initialize to an empty object

  constructor() {}

  ngOnInit(): void {
    this.initializeCharts();
  }

  initializeCharts(): void {
    this.globalCompletionChart = {
      title: {
        text: 'Taux de Complétion Global',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' }
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c}%'
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'] // Sample data, replace as needed
      },
      yAxis: {
        type: 'value',
        max: 100,
        axisLabel: { formatter: '{value}%' }
      },
      series: [{
        data: [85, 90, 80, 70, 95, 88], // Sample data, replace as needed
        type: 'bar',
        itemStyle: {
          color: '#3498db'
        }
      }]
    };

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
        data: [{
          value: [80, 90, 70, 85], // Sample data, replace as needed
          name: 'Département A'
        }]
      }]
    };
  }

  exportToExcel(): void {
    // Your export to Excel logic here
  }

  exportToPDF(): void {
    // Your export to PDF logic here
  }
}