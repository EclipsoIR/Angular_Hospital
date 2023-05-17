import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Localizacion } from '../list/list.component';
// import { config } from '../../../../../src/assets/config.json';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private _baseUrl = "https://localhost:7099/"
  public hospitalExist: boolean = false;
  public localitationSelect = [{ id: 0, name: Localizacion.espana }, { id: 1, name: Localizacion.portugal }, { id: 2, name: Localizacion.francia }]
  public hospital: Hospital = {
    id: '',
    nombre: '',
    localizacion: 0,
    especialidades: '',
    capacidad: 0,
    cantTrabajadores: 0,
    pacientesActuales: 0,
    trabajadoresActuales: 0
  };
  public hospitalPostDTO :HospitalPostDTO ={
    id:'00000000-0000-0000-0000-000000000000',
    nombre: '',
    cantTrabajadores: 0,
    capacidad: 0,
    especialidades: '',
    localizacion: 0
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {
  }
  async ngOnInit(): Promise<void> {
    const hospitalId = this.route.snapshot.paramMap.get('id');

    if (hospitalId) {
      this.hospital = await this.getHospitalById(hospitalId)
      this.hospitalPostDTO.id=hospitalId
    }
  }
  public goBack() {
    this.router.navigate(["/hospital/list"])
  }
  public saveDataHospital() {
    console.log(this.hospital);
    
    this.hospitalPostDTO.nombre=this.hospital.nombre;
    this.hospitalPostDTO.cantTrabajadores=this.hospital.cantTrabajadores;
    this.hospitalPostDTO.capacidad=this.hospital.capacidad;
    this.hospitalPostDTO.especialidades=this.hospital.especialidades;
    this.hospitalPostDTO.localizacion=Number(this.hospital.localizacion)
    console.log(this.hospitalPostDTO);
    
      let endpoint = this._baseUrl + 'Hospital/AddEditHospital'
      this.http.post(endpoint, this.hospitalPostDTO).subscribe({
        next: data => {
          this.goBack()
        },
        error: error => {
          console.log('errorrrrrrrr');
        }
      })


  }

  private async getHospitalById(id: string): Promise<Hospital> {

    let endpoint = this._baseUrl + 'Hospital/GetHospitaById/' + id
    return fetch(endpoint, {
      headers: { 'Cotent-type': 'application/json' },
      method: 'GET'
    }).then(response => {
      return response.json().then(data => {
        this.hospitalExist = true;
        return data
      })
    })
  }


}

export interface HospitalPostDTO{
  id: string|null,
  nombre: string,
  cantTrabajadores: number,
  capacidad: number,
  especialidades: string,
  localizacion: number
}


export interface Hospital {
  id: string,
  nombre: string,
  localizacion: number,
  especialidades: string,
  capacidad: number,
  cantTrabajadores: number,
  pacientesActuales: number,
  trabajadoresActuales: number
}