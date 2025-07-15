import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeformationComponent } from './homeformation/homeformation.component';
import { ActualiteComponent } from './Actualitéoffice/actualite/actualite.component';
import { FormationComponent } from './formation/formation.component';
import { HistoriqueComponent } from './historique/historique.component';
import { FormationofficeComponent } from './Formations/formationoffice/formationoffice.component';
import { ShowformationdetailsofficeComponent } from './Formations/showformationdetailsoffice/showformationdetailsoffice.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';

const routes: Routes = [

  {
    path: 'homepage',
    component: HomeComponent,
    data: {
      title: 'home page',
    },
  },
  {
    path: 'homelms',
    component: HomeformationComponent,
    data: {
      title: 'home lms',
    },
  },
  {
    path: 'formation',
    component: FormationComponent,
    data: {
      title: 'home lms',
    },
  },
  {
    path: 'formations',
    component: FormationofficeComponent,
    data: {
      title: 'home lms',
    },
  },
  {
    path: 'historique',
    component: HistoriqueComponent,
    data: {
      title: 'historique lms',
    },
  },
   {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'dashboard lms',
    },
  },
  {
    path: 'actualite',
    component: ActualiteComponent,
    data: {
      title: 'actualite lms',
    },
  },
    {
      path: 'formation-detail/:id',
      component: ShowformationdetailsofficeComponent
  
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
