import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Data, Router } from '@angular/router';
import { max } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private _baseUrl = "https://localhost:7099";
  personas: DataTableDTO = { page: 1, totalPages: 1, result: [{ id: '0', edad: 20, estado: 1, nombre: '23', p_Apellido: '23', s_Apellido: '23' }] }
  todaspersonas : PersonaMiniDTO[]=[];
  currentPage = 1;
  constructor(
    private httpClient: HttpClient,
    private readonly router: Router
  ) {

  }

  async ngOnInit(): Promise<void> {

    this.personas = await this.getDataListByPage(this.currentPage);
    this.todaspersonas= await this.getDataListPersonas()
    console.log(this.personas);
    console.log(this.todaspersonas);


  }

  async getDataListByPage(page: number): Promise<DataTableDTO> {
    this.personas.result = [];
    let endpoint = this._baseUrl + `/Persona/TablePersonaTable?page=${page}`
    return fetch(endpoint, {
      headers: { 'Content-type': 'application/json' },
      method: 'GET'
    }).then(response => {
      return response.json().then(data => {

        return data
      })
    })
  }


  async getDataListPersonas(): Promise<any> {
    let endpoint = this._baseUrl + "/Persona/GetListPersona"
    return fetch(endpoint, {
      headers: { 'Content-type': 'application/json' },
      method: 'GET'
    }).then(response => {
      return response.json().then(data => {
        return data
      })
    })
  }

  async goToPage(page: number): Promise<void> {
    this.currentPage += page;

    if (this.currentPage >= this.personas.totalPages) {
      this.currentPage =  this.personas.totalPages;
    }
    else if(this.currentPage <= 0){
      this.currentPage = 1;
    }
    console.log(this.currentPage);
    
    this.personas = await this.getDataListByPage(this.currentPage);
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
    await this.getDataListPersonas()
  }



  gotoDetailPersona(id: string) {
    this.router.navigate(["persona/details", id])
  }
  gotoCreatePaciente(id: string) {
    this.router.navigate(["persona/new", id])
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
  estado: number
}