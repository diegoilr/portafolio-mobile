import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccidenteInterface } from '../../models/accidente-interface';
import { EmpresaService } from '../../services/empresa.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public crudService: EmpresaService, private router: Router) { }

  ngOnInit(): void {
    this.crudService.GetAccidentesByUser(this.consultarNombreCliente()).subscribe((res: AccidenteInterface[])=>{
      this.Accidentes=res;
    })
  }

  id_accidente: number;
  descripcion_acc: string;
  fecha_accidente: Date;
  cliente_rut_cliente: number;
  cliente_nombre_usuario: string;
  Accidentes: AccidenteInterface[];


  consultarNombreUsuario(){
    const dataUsuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    return dataUsuario.nombre_usuario;
  }

  consultarRutUsuario(){
    const dataUsuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    return dataUsuario.rut_cliente;
  }

  consultarNombreCliente(){
    const dataUsuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    return dataUsuario.nombre_cliente;
  }

  addAccidente(){
    this.crudService.insertAccidente(this.id_accidente, this.descripcion_acc, this.fecha_accidente, this.consultarRutUsuario(), this.consultarNombreUsuario()).subscribe((res:AccidenteInterface)=>{
    })
  }

  listarAccidente(){
    this.crudService.GetAccidentesByUser(this.consultarNombreUsuario()).subscribe((res:AccidenteInterface[])=>{
      this.Accidentes = res;
    })
  }

}
