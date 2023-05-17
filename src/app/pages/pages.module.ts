import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '', redirectTo: 'hospital', pathMatch:'full'
  },
  {
  path :"hospital",loadChildren : () => import("./hospital/hospital.module").then(m=>m.HospitalModule),
  },
  {
    path:"persona", loadChildren : ()=> import("./persona/persona.module").then(m=>m.PersonaModule),
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // HttpClientModule
  ]
})
export class PagesModule { }
