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
    this.crudService.GetEmpresas().subscribe((res: EmpresaInterface[]) =>
    {
      this.Empresas = res;
    })
  }

  id_empresa: number = 0;
  nombre_empresa: string = "";
  Empresas: EmpresaInterface[] = [];

  addEmpresa(){
    this.crudService.InsertEmpresa(this.id_empresa,this.nombre_empresa)
    .subscribe((res: EmpresaInterface[]) => {
      this.Empresas = res;
      this.id_empresa=0;
      this.nombre_empresa="";
    })
  }

  getDataEmpresa(id_empresa, nombre_empresa){
    this.id_empresa = id_empresa;
    this.nombre_empresa = nombre_empresa;

  }

  updateEmpresa(){
    this.crudService.UpdateEmpresa(this.id_empresa,this.nombre_empresa).subscribe((res:EmpresaInterface[])=>{
      this.Empresas = res;
      this.id_empresa = 0;
      this.nombre_empresa = "";
    })

  }

  deleteEmpresa(id_empresa){
    this.crudService.DeleteEmpresa(id_empresa).subscribe((res:EmpresaInterface[])=>{
      this.Empresas = res;
    })

  }


  cerrarSesion(){
    this.crudService.logout();
  }

}
