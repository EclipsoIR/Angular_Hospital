import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =[
  {
    path: "", redirectTo:"list", pathMatch:"full"
  },
  {
    path:"list", loadChildren : () => import("./list/list.module").then(m=>m.ListModule)
  },
  {
    path:"details/:id", loadChildren:() => import("./details/details.module").then(m=>m.DetailsModule)
  },
  {
    path:"new", loadChildren:()=> import("./details/details.module").then(m=>m.DetailsModule)
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PersonaModule { }
