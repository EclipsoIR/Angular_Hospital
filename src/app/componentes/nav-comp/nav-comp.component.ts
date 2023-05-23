import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-comp',
  templateUrl: './nav-comp.component.html',
  styleUrls: ['./nav-comp.component.scss']
})
export class NavCompComponent implements OnInit {
  constructor(
    public router: Router,
    private route: ActivatedRoute,


  ) {
  }
  ngOnInit(): void {
  }

  changeStyleOnActive (wordInThePath : string): boolean{
    let url = window.location.pathname;
    if(url.includes(wordInThePath)){
      return true
    }
   
    return false;
    
  }


}
