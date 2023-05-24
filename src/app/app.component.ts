import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular_Hospital';
  
  activateNav (): boolean{
    let url = window.location.pathname;
    if(url.includes("home")){
      return false;
    }
    return true;
  }
}
