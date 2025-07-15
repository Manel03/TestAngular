import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { HistoriqueComponent } from './frontoffice/historique/historique.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/front-office/homepage',
        pathMatch: 'full',
      },
      { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) }
,
      {
        path: 'back-office',
        
        loadChildren: () =>
          import('./backoffice/backoffice.module').then((m) => m.BackofficeModule),
      },

     { path: 'historique', component: HistoriqueComponent },

      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
    ],
  },
  {
    path: 'front-office',
    component: BlankComponent,
    children: [
      { 
        path: '',
        loadChildren: () =>
          import('./frontoffice/frontoffice.module').then((m) => m.FrontofficeModule),
      }
    ]
    
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
