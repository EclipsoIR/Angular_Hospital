import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
  private _baseUrl = "https://localhost:7099"
  motivoSelect: any[] = [{ id: 0, name: 'Malestar' }, { id: 1, name: 'Fiebre' }, { id: 2, name: 'Resfriado' }, { id: 3, name: 'Rotura de Hueso' }, { id: 4, name: 'Accidente' }, { id: 5, name: 'Operacion' }]
  persona!: PersonadMiniDto;
  hospitales: HospitalMiniDTO[] = [];

  patientPostDto = new FormGroup({
    id: new FormControl('00000000-0000-0000-0000-000000000000'),
    fecha: new FormControl(new Date().toISOString()),
    motivo: new FormControl(0),
    personaId: new FormControl(''),
    hospitalId: new FormControl('')
  })


  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private toastrService: ToastrService

  ) {

  }
  async ngOnInit() {
    // this.activateRouter.paramMap.subscribe(params=>{
    //   this.personId = params.get('id')});
    let id = this.activateRouter.snapshot.paramMap.get("id");
    console.log(id);
    this.hospitales = await this.getDataHospital()

    this.persona = await this.getDataPerson(id)

    console.log(this.hospitales);
    this.patientPostDto = new FormGroup({
      id: new FormControl('00000000-0000-0000-0000-000000000000'),
      fecha: new FormControl(new Date().toISOString()),
      motivo: new FormControl(0),
      personaId: new FormControl(this.persona.id && this.persona ? this.persona.id : ''),
      hospitalId: new FormControl('')
    })

  }
  async savePatient() {
    let paciente = this.patientPostDto.value;
    paciente.motivo = Number(paciente.motivo);
    let endpoint = this._baseUrl + `/Paciente/AddEditPatient`
    return fetch(endpoint, {
      headers: { 'Content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(paciente)
    }).then(response => {
      return response.json().then(data => {
        if (response.status == 400) {
          this.toastrService.warning(data)
        }
        if (response.status == 200) {
          this.toastrService.success("Se añadió la persona como paciente")
          this.router.navigate(["/persona/list"])
        }
      })
    })
  }

  changeLocalitation(localizacion: number) {
    switch (localizacion) {
      case 0:
        return "España"
      case 1:
        return "Portugal"
      case 2:
        return "Francia"
      default:
        return ''
        break;
    }
  }





  // getDataHospital(){
  //   let endpoint = this._baseUrl+`/Hospital/GetListHospital`
  //   this.httpClient.get(endpoint).subscribe({
  //     next:data=>{
  //       console.log(data);

  //       this.hospitales=data as HospitalMiniDTO[]
  //     }
  //   })
  // }




  getDataHospital() {
    let endpoint = this._baseUrl + `/Hospital/GetListHospital`
    return fetch(endpoint, {
      headers: { 'Content-type': 'application/json' },
      method: 'GET',
    }).then(response => {
      return response.json().then(data => {
        return data;
      })
    })
  }

  async getDataPerson(id: any) {
    let endpoint = this._baseUrl + `/Persona/GetPersonaById/${id}`
    return fetch(endpoint, {
      headers: { 'Content-type': 'application/json' },
      method: 'GET',
    }).then(response => {
      return response.json().then(data => {
        return data
      })
    })

  }

}



export interface HospitalMiniDTO {
  id: string,
  nombre: string,
  localizacion: number,
  especialidades: string,
  capacidad: number,
  cantTrabajadores: number,
  trabajadoresActuales: number,
  pacientesActuales: number
}

export enum Localizacion {
  espana = "España",
  portugal = "Portugal",
  francia = "Francia"
}



export interface PersonadMiniDto {
  id: string,
  nombre: string,
  p_Apellido: string,
  s_Apellido: string,
  edad: number,
  estado: number
}