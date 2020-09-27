import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { EmpresaInterface } from '../../models/empresa-interface';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CRUDComponent implements OnInit {

  constructor(public crudService: EmpresaService) { }

  ngOnInit(): void {
    this.crudService.GetEmpresas().subscribe((res:EmpresaInterface[])=>{
      this.Empresas = res;
    })
  }

  id_empresa: string = "''";
  nombre_empresa: string = "";
  Empresas: EmpresaInterface[] =[];

  addEmpresa(){
    console.log(this.id_empresa, this.nombre_empresa);
    this.id_empresa="";
    this.nombre_empresa="";
  }

}
