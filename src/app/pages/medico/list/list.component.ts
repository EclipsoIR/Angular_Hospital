import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  base = 'https://localhost:7099';
  // medicoMiniDTO! : MedicoMiniDTO
  medicos : MedicoMiniDTO[]=[]

  async ngOnInit(): Promise<void> {
    this.medicos = await this.getData();
    console.log(this.medicos);
    
  }

  async getData(): Promise<MedicoMiniDTO[]>{
    let endpoint = this.base+`/Medico/GetListMedicos`;
    return fetch(endpoint,{
      headers:{'Content-type':'application/json'},
      method:'GET'
    }).then(response=>{
      return response.json().then(data=>{
        return data
      })
    })
  }

}


export interface MedicoMiniDTO {
   id :  string,
   horasDia :  string ,
   personaId :  string,
   personaNombre :  string ,
   personaP_Apellido :  string ,
   personaS_Apellido :  string ,
   personaEdad : number,
   personaEstado : number,
   hospitalId :  string ,
   hospitalNombre :  string,
   hospitalLocalizacion : number,
   hospitalEspecialidades :  string ,
   hospitalCapacidad : number,
   hospitalCantTrabajadores : number,
   funcionId :  string ,
   funcionNombre :  string,
   areaId :  string 
}

