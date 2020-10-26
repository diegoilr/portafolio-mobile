import { Component, OnInit } from '@angular/core';
import { AccidenteInterface } from '../../models/accidente-interface';
import { EmpresaService } from '../../services/empresa.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public crudService: EmpresaService) { }

  ngOnInit(): void {
  }

  id_accidente: number;
  descripcion_acc: string;
  fecha_accidente: Date;
  cliente_rut_cliente: number;
  cliente_nombre_usuario: string;
  Accidentes: AccidenteInterface[];


  consultarNombreUsuario(){
    const dataUsuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    return dataUsuario.nombre_cliente;
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

  }

}
