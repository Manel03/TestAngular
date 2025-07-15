import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesRoutes } from './pages.routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { NgxEchartsModule } from 'ngx-echarts';
import { KpiCollaborateurComponent } from './dashboard/kpi-collaborateur/kpi-collaborateur.component';
import { KpiManagerComponent } from './dashboard/kpi-manager/kpi-manager.component';
import { KpiRhComponent } from './dashboard/kpi-rh/kpi-rh.component'; 
@NgModule({
  declarations: [DashboardComponent,KpiCollaborateurComponent,
    KpiManagerComponent,
    KpiRhComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    RouterModule.forChild(PagesRoutes),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    TablerIconsModule.pick(TablerIcons),
  ],
  exports: [
    KpiCollaborateurComponent,
    KpiManagerComponent,
    KpiRhComponent,
    TablerIconsModule
  ]
})
export class PagesModule {}
