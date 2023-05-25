import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"", redirectTo:"list", pathMatch: "full"
  },
  {
    path : "list", loadChildren : () => import("./list/list.module").then(m=>m.ListModule)
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MedicoModule { }
