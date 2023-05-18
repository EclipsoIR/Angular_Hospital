import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
  {
    path: '', redirectTo: 'hospital', pathMatch:'full'
  },
  {
    path:"persona", loadChildren : ()=> import("./persona/persona.module").then(m=>m.PersonaModule),
  },
  {
  path :"hospital",loadChildren : () => import("./hospital/hospital.module").then(m=>m.HospitalModule),
  }

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ]
})
export class PagesModule { }
