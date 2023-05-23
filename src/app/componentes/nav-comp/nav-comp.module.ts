import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavCompComponent } from './nav-comp.component';
import { AppRoutingModule } from 'app/app-routing.module';



@NgModule({
  declarations: [
    NavCompComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    NavCompComponent
  ]
})
export class NavCompModule { }
