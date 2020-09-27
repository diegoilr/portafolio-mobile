import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CRUDComponent implements OnInit {

  constructor(public crudService: EmpresaService) { }

  ngOnInit(): void {
    this.crudService.GetEmpresas().subscribe((res)=>{
      console.log(res);
    })
  }

  id_empresa: string = "''";
  nombre_empresa: string = "";

  addEmpresa(){
    console.log(this.id_empresa, this.nombre_empresa);
    this.id_empresa="";
    this.nombre_empresa="";
  }
}
