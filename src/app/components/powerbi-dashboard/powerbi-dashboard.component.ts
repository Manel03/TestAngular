import { Component } from '@angular/core';

@Component({
  selector: 'app-powerbi-dashboard',
  templateUrl: './powerbi-dashboard.component.html',
  styleUrls: ['./powerbi-dashboard.component.scss']
})
export class PowerbiDashboardComponent {
  powerBIUrl = 'https://app.powerbi.com/view?r=eyJrIjoi...'; // ton lien ici
}
