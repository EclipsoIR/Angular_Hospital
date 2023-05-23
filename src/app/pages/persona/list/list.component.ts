import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Data, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private _baseUrl = "https://localhost:7099";
  personas: DataTableDTO = { page: 1, totalPages: 1, result: [{ id: '0', edad: 20, estado: 1, nombre: '23', p_Apellido: '23', s_Apellido: '23', isPatient:false }] }
  currentPage = 1;
  listPages: number[] =[]
  public personExist: boolean = false;
  public showModal : boolean = false;
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
    private httpClient: HttpClient,
    private readonly router: Router,
  ) {

  }

  async ngOnInit(): Promise<void> {

    this.personas = await this.getDataListByPage();
    for(let i=1; i<=this.personas.totalPages;i++)
    {
      this.listPages.push(i);
    }
    console.log(this.personas);


  }

  async getDataListByPage(): Promise<DataTableDTO> {
    let endpoint = this._baseUrl + `/Persona/TablePersonaTable?page=${this.currentPage}`
    return fetch(endpoint, {
      headers: { 'Content-type': 'application/json' },
      method: 'GET'
    }).then(response => {
      return response.json().then(data => {

        return data
      })
    })
  }


  // async getDataListPersonas(): Promise<any> {
  //   let endpoint = this._baseUrl + "/Persona/GetListPersona"
  //   return fetch(endpoint, {
  //     headers: { 'Content-type': 'application/json' },
  //     method: 'GET'
  //   }).then(response => {
  //     return response.json().then(data => {
  //       return data
  //     })
  //   })
  // }

  async goToPage(page: number): Promise<void> {
    this.currentPage += page;

    if (this.currentPage >= this.personas.totalPages) {
      this.currentPage =  this.personas.totalPages;
    }
    else if(this.currentPage <= 0){
      this.currentPage = 1;
    }
    
    this.personas = await this.getDataListByPage();
  }

  async pagesSelected(numero: number): Promise<void>{
    this.currentPage = numero;
    this.personas = await this.getDataListByPage();

  }


  async deletePersona(id: string) {
    let endpoint = this._baseUrl + "/Persona/DeletePersonaById"
    fetch(endpoint, {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
      body: JSON.stringify(id)
    }).then(response => {
      return response.json().then(data => {

      })
    })
    await this.getDataListByPage()
  }

  closeModal(): void {
    this.showModal = false;
  }

  async gotoDetailPersona(id: string) {
    this.showModal=true;
    if (id) {
      this.personaMini = await this.getPersonaById(id);
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
  gotoCreatePaciente(id: string) {
    this.router.navigate(["persona/addPatient", id])
  }

  public async getPersonaById(id: string) {
    let router = this._baseUrl + `/Persona/GetPersonaById/${id}`;
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

export interface DataTableDTO {
  page: number,
  totalPages: number,
  result: PersonaMiniDTO[]
}


export interface PersonaMiniDTO {
  id: string,
  nombre: string,
  p_Apellido: string,
  s_Apellido: string,
  edad: number,
  estado: number,
  isPatient:boolean
}