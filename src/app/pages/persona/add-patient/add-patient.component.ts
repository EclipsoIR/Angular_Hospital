import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
  private _baseUrl = "https://localhost:7099"
  motivoSelect:any[]=[{id:0,name:'Malestar'},{id:1,name:'Fiebre'},{id:2,name:'Resfriado'},{id:3,name:'Rotura de Hueso'},{id:4,name:'Accidente'},{id:5,name:'Operacion'}]
  persona!: PersonadMiniDto;
  constructor(
    private activateRouter:ActivatedRoute
  ){

  }
  async ngOnInit() {
    // this.activateRouter.paramMap.subscribe(params=>{
    //   this.personId = params.get('id')});
    let id = this.activateRouter.snapshot.paramMap.get("id");
    console.log(id);
    
    this.persona = await this.getDataPerson(id)
    console.log(this.persona);
    
    
  }
  
  async getDataPerson(id:any){
    let endpoint = this._baseUrl+`/Persona/GetPersonaById/${id}`
    return fetch (endpoint,{
      headers:{'Content-type': 'application/json'},
      method:'GET',
    }).then(response=>{
      return response.json().then(data=>{
        return data
      })
    })

  }

}


export interface PersonadMiniDto {
  id: string,
  nombre: string,
  p_Apellido: string,
  s_Apellido: string,
  edad: number,
  estado: number
}