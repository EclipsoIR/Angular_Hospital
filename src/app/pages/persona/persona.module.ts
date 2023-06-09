import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes =[
  {
    path: "", redirectTo:"list", pathMatch:"full"
  },
  {
    path:"addPatient/:id", component: AddPatientComponent, pathMatch:"full"
  },
  {
    path:"list", loadChildren : () => import("./list/list.module").then(m=>m.ListModule)
  },
  {
    path:"details/:id", loadChildren:() => import("./details/details.module").then(m=>m.DetailsModule)
  },
  {
    path:"new/:id", loadChildren:()=> import("./details/details.module").then(m=>m.DetailsModule)
  },
]

@NgModule({
  declarations: [
    AddPatientComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule
  ]
})
export class PersonaModule { }
