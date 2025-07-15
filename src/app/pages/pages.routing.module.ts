import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KpiCollaborateurComponent } from './dashboard/kpi-collaborateur/kpi-collaborateur.component';
import { KpiManagerComponent } from './dashboard/kpi-manager/kpi-manager.component';
import { KpiRhComponent } from './dashboard/kpi-rh/kpi-rh.component';

export const PagesRoutes: Routes = [
  { 
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'kpi-collaborateur', component: KpiCollaborateurComponent },
      { path: 'kpi-manager', component: KpiManagerComponent },
      { path: 'kpi-rh', component: KpiRhComponent },
      { path: '', redirectTo: 'collaborateur', pathMatch: 'full' }
    ]
  }
];
