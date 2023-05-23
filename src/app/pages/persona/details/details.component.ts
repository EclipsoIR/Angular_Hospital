import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private _baseUrl = "https://localhost:7099/"
  public personExist: boolean = false;
  public estadosSelect = [{ id: 0, name: "Trabajando" }, { id: 1, name: "Estudiando" }, { id: 2, name: "Parado" }, { id: 3, name: "Jubilado" }, { id: 4, name: "Baja Medica" }]
  public personaMini: PersonaMiniDTO = {
    id: "",
    nombre: "",
    p_Apellido: "",
    s_Apellido: "",
    edad: 0,
    estado: 0,
    isPatient: false
  };

  personaForm = new FormGroup({
    id: new FormControl(""),
    nombre: new FormControl(""),
    primerApellido: new FormControl(""),
    segundoApellido: new FormControl(""),
    edad: new FormControl(0),
    estado: new FormControl(0)
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,

  ) {

  }
  async ngOnInit(): Promise<void> {
    const personaId = this.route.snapshot.paramMap.get('id');
    console.log(personaId);
    if (personaId) {
      this.personaMini = await this.getPersonaById(personaId);
      console.log(this.personaMini);

      this.personaForm.setValue({
        id: this.personaMini.id,
        nombre: this.personaMini.nombre,
        primerApellido: this.personaMini.p_Apellido,
        segundoApellido: this.personaMini.s_Apellido,
        edad: this.personaMini.edad,
        estado: this.personaMini.estado
      })
    }
    else {
      this.personaForm.setValue({
        id: '00000000-0000-0000-0000-000000000000',
        nombre: this.personaMini.nombre,
        primerApellido: this.personaMini.p_Apellido,
        segundoApellido: this.personaMini.s_Apellido,
        edad: this.personaMini.edad,
        estado: this.personaMini.estado
      })
    }
  }

  public async saveDataPersona() {
    if (this.personaForm.valid) {
      let newPersona = this.personaForm.value;
      console.log(newPersona);

    }
  }

  public goBack() {
    this.router.navigate(["/persona/list"]);
  }

  public async getPersonaById(id: string) {
    let router = this._baseUrl + `Persona/GetPersonaById/${id}`;
    return fetch(router, {
      headers: { 'Content-type': 'application/json' },
      method: 'GET'
    }).then(response => {
      return response.json().then(data => {
        this.personExist = true;
        return data
      })
    })
  }
}


export interface PersonaMiniDTO {
  id: string,
  nombre: string,
  p_Apellido: string,
  s_Apellido: string,
  edad: number,
  estado: number,
  isPatient: boolean
}