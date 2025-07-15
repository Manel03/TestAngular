import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as ExcelJS from 'exceljs/dist/exceljs.min.js';
import * as FileSaver from 'file-saver';
import html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  completionRate = 82;
  averageDuration = '45 min';
  activeTime = '3h 20min';
  averageScore = 88;
  totalCourses = 12;

  selectedDepartment = '';
  selectedManager = '';
  startDate: string = '';
  endDate: string = '';
  departments = ['RH', 'Technique', 'Commercial'];
  managers = ['Mme Yassine', 'M. Ali'];

  completionChart: EChartsOption = {
    title: { text: 'Taux de complétion moyen', left: 'center' },
    xAxis: { type: 'category' as const, data: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai'] },
    yAxis: { type: 'value' as const },
    series: [{
      data: [70, 75, 80, 85, 82],
      type: 'line' as const,
      smooth: true
    }]
  };

  participationChart: EChartsOption = {
    title: { text: 'Participation par département', left: 'center' },
    tooltip: {},
    xAxis: { type: 'category' as const, data: ['RH', 'Technique', 'Commercial'] },
    yAxis: { type: 'value' as const },
    series: [{
      data: [12, 19, 8],
      type: 'bar' as const
    }]
  };

  satisfactionChart: EChartsOption = {
    title: { text: 'Taux de satisfaction', left: 'center' },
    tooltip: { trigger: 'item' as const },
    series: [{
      type: 'pie' as const,
      radius: '50%',
      data: [
        { value: 1048, name: 'Très Satisfait' },
        { value: 735, name: 'Satisfait' },
        { value: 580, name: 'Peu satisfait' },
        { value: 484, name: 'Insatisfait' }
      ]
    }]
  };

  applyFilters() {
    console.log('Filtres appliqués');
  }

  resetFilters() {
    this.selectedDepartment = '';
    this.selectedManager = '';
    this.startDate = '';
    this.endDate = '';
  }


exportToPDF() {
  const element = document.getElementById('kpiSection');
  if (!element) return;

  const opt = {
    margin:       0,
    filename:     'kpis-collaborateur.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
}

async exportToExcelWithCharts() {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('KPI Formation');

  // 1. Ajout de l'entête
  sheet.addRow([
    'Taux de complétion',
    'Durée moyenne',
    'Temps actif',
    'Score moyen',
    'Formations suivies'
  ]);
  sheet.addRow([
    `${this.completionRate}%`,
    this.averageDuration,
    this.activeTime,
    `${this.averageScore}/100`,
    this.totalCourses
  ]);

  // 2. Identifiants des divs de graphiques
  const chartIds = ['completionChart', 'satisfactionChart']; // Ajoute les bons IDs HTML ici
  let imageIndex = 0;

  for (let chartId of chartIds) {
    const chartEl = document.getElementById(chartId);
    if (!chartEl) continue;

    // Pause pour que le DOM soit bien prêt
    await new Promise(resolve => setTimeout(resolve, 300));

    const canvas = await html2canvas(chartEl);
    const imgData = canvas.toDataURL('image/png');

    const imageId = workbook.addImage({
      base64: imgData,
      extension: 'png',
    });

    // 3. Calcul de la position
    const startRow = 4 + imageIndex * 20; // Décalage entre les images
    const endRow = startRow + 14;

    // Fusionner cellules pour avoir l'espace image
    sheet.mergeCells(`A${startRow}:F${endRow}`);

    // Insertion image
    sheet.addImage(imageId, {
      tl: { col: 0, row: startRow },
      ext: { width: 600, height: 300 }
    });

    imageIndex++;
  }

  // 4. Génération et téléchargement
  const buffer = await workbook.xlsx.writeBuffer();
  FileSaver.saveAs(new Blob([buffer]), 'dashboard_kpi.xlsx');
}
 selectedRole: 'collaborateur' | 'manager' | 'rh' = 'collaborateur';

selectRole(role: 'collaborateur' | 'manager' | 'rh') {
  this.selectedRole = role;
}

}