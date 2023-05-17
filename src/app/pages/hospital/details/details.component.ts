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
  // public hospitalWithOutID :HospitalWithOutId ={
  //   nombre: '',
  //   cantTrabajadores: 0,
  //   capacidad: 0,
  //   especialidades: 0,
  //   localizacion: 0
  // }

  hospitalForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    localizacion: new FormControl(0),
    especialidades: new FormControl(''),
    capacidad: new FormControl(0),
    cantTrabajadores: new FormControl(0),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {
  }
  async ngOnInit(): Promise<void> {
    const hospitalId = this.route.snapshot.paramMap.get('id');
    // console.log(hospitalId, 'ID');

    if (hospitalId) {
      this.hospital = await this.getHospitalById(hospitalId)
      // console.log(this.hospital, 'INCIo');

      this.hospitalForm.setValue({
        id: this.hospital.id,
        nombre: this.hospital.nombre,
        cantTrabajadores: this.hospital.cantTrabajadores,
        capacidad: this.hospital.capacidad,
        especialidades: this.hospital.especialidades,
        localizacion: this.hospital.localizacion,
      })

    }
    else
      this.hospitalForm.setValue({
        id: '00000000-0000-0000-0000-000000000000',
        nombre: this.hospital.nombre,
        cantTrabajadores: this.hospital.cantTrabajadores,
        capacidad: this.hospital.capacidad,
        especialidades: this.hospital.especialidades,
        localizacion: this.hospital.localizacion,
      })

  }
  public goBack() {
    this.router.navigate(["/hospital/list"])
  }
  public saveDataHospital() {

    console.log(this.hospitalForm.value);

    if (this.hospitalForm.valid) {



      let newHostpital = this.hospitalForm.value;


      newHostpital.localizacion = Number(newHostpital.localizacion);
      // console.log(newHostpital, 'Created');

      let endpoint = this._baseUrl + 'Hospital/AddEditHospital'
      this.http.post(endpoint, newHostpital).subscribe({
        next: data => {
          this.goBack()
        },
        error: error => {
          console.log('errorrrrrrrr');
        }
      })
    } else
      console.log('ERRRRRRRRRRR');

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
    //  this.http.get(endpoint).subscribe({
    //   next: data => {

    //     return data as Hospital;
    //   }
    // })
  }
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