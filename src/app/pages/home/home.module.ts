import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home', component:HomeComponent, pathMatch :"full"
  }
]

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class HomeModule { }
