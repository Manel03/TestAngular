import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsermanagementComponent } from './user-management/usermanagement/usermanagement.component';
import { ShowuserdetailsComponent } from './user-management/showuserdetails/showuserdetails.component';
import { AddedituserComponent } from './user-management/addedituser/addedituser.component';
import { UploadExcelComponentComponent } from './exceldemande/upload-excel-component/upload-excel-component.component';
import { ActualiteComponent } from '../frontoffice/Actualitéoffice/actualite/actualite.component';
import { ActualitemanagmentComponent } from './actualite-management/actualitemanagment/actualitemanagment.component';
import { AddeditActualiteComponent } from './actualite-management/addedit-actualite/addedit-actualite.component';
import { DeleteConfirmationactualiteComponent } from './actualite-management/delete-confirmationactualite/delete-confirmationactualite.component';
import { FormationmanagementComponent } from './formation-management/formationmanagement/formationmanagement.component';
import { AddeditFormationComponent } from './formation-management/addedit-formation/addedit-formation.component';
import { ShowformationdetailComponent } from './formation-management/showformationdetail/showformationdetail.component';

const routes: Routes = [
  {
    path: 'user-list',
    component: UsermanagementComponent,
    data: {
      title: 'Manager users',
    },
  },
  {
    path: 'user-list',
    component: UsermanagementComponent,
    data: {
      title: 'Manager users',
    },
  },
  {
    path: 'excel-list',
    component:UploadExcelComponentComponent,
    data: {
      title: 'Excel users',
    },
  },
  {
    path: 'actualite-list',
    component:ActualitemanagmentComponent,
    data: {
      title: 'Actualite List',
    },
  },
  {
    path: 'formation-list',
    component:FormationmanagementComponent,
    data: {
      title: 'Formation List',
    },
  },
  
  {
    path: 'user/:id',
    component: ShowuserdetailsComponent,
    data: {
      title: 'User Details',
    },
  },
  {
    path: 'formation-detail/:id',
    component: ShowformationdetailComponent

  },
  
  { path: 'addeditformation', component: AddeditFormationComponent },
  { path: 'addeditformation/:id', component: AddeditFormationComponent },
  { path: 'addedituser', component: AddedituserComponent },
  { path: 'addedituser/:id', component: AddedituserComponent },
  { path: 'addeditactualite/:id', component: AddeditActualiteComponent },
  { path: 'addeditactualite', component: AddeditActualiteComponent },
  { path: 'deleteactualite/:id', component: DeleteConfirmationactualiteComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
