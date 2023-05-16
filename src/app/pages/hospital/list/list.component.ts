import { Component, OnInit } from '@angular/core';
import{HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { map, lastValueFrom } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
 private _baseUrl = "https://localhost:7099"
  hospitales:HospitalMiniDTO[]=[];
 /*  hospitales: any; */

constructor(
  private httpClient : HttpClient,
  private readonly router: Router
){

}

  async ngOnInit() {
    await this.getDataListHospitales();
  }

  async getDataListHospitales(){
    await this.httpClient.get(`${this._baseUrl}/Hospital/GetListHospital`).pipe(
      map((response:any)=>{
        const asObject: HospitalMiniDTO [] = response;
        this.hospitales = asObject;
        return asObject;
      })
    ).toPromise();
  }

  // async getDataListHospitales(){
  //   const list = this.httpClient.get(`${this._baseUrl}/Hospital/GetListHospital`)
  //   let myList = await lastValueFrom(list)
  //   this.hospitales = myList as HospitalMiniDTO[]

  // }


  //  getDataListHospitales(){
  //   this.httpClient.get(`${this._baseUrl}/Hospital/GetListHospital`).subscribe({
  //     next : data =>{
  //       console.log(data);
        
  //       this.hospitales = data as HospitalMiniDTO[] ;
  //     },error:error=>{

  // }
  //   })
  // }

  async deleteHospital(id:string){
    await this.httpClient.delete(`${this._baseUrl}/Hospital/DeleteHospitaById/${id}`).pipe(
      map((response:any)=>{
        console.log(response);
        
        return response;
      })
    ).toPromise()
    await this.getDataListHospitales();
  }

  goToDetailsHospital(id: string){
    this.router.navigate(['hospital/details',id])
  }
  gotoCreateHospital(){
    this.router.navigate(['hospital/new'])
  }
}



export interface HospitalMiniDTO{
  id: string,
  nombre : string,
  localizacion: Localizacion,
  especialidades: string,
  capacidad : number,
  cantTrabajadores : number,
  trabajadoresActuales : number,
  pacientesActuales : number
}

export enum Localizacion{
  espana="España",
  portugal="Portugal",
  francia="Francia"
}
