import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaInterface } from 'src/app/models/empresa-interface';
import { AccidenteInterface } from '../../models/accidente-interface';
import { EmpresaService } from '../../services/empresa.service';
import { UsuarioInterface } from '../../models/usuario-interface';
import { Identifiers } from '@angular/compiler';
import { CapacitacionInterface } from '../../models/capacitacion-interface';
import { CapacitacionesInterface } from '../../models/capacitaciones-interface';
import { of } from 'rxjs';
import { AccidentesInterface } from 'src/app/models/accidentes-interface';
import { ProfesionalInterface } from '../../models/profesional-interface';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public crudService: EmpresaService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.checkAdmin();
  }

  id_accidente: number;
  id_capacitacion: number;
  descripcion_acc: string;
  fecha_accidente: Date;
  cliente_rut_cliente: number;
  cliente_nombre_usuario: string;
  Accidentes: AccidentesInterface[];
  Accidentes2: AccidenteInterface[];
  Usuarios: UsuarioInterface[];
  Profesionales: ProfesionalInterface[];
  Empresas: EmpresaInterface[];
  Capacitacion: CapacitacionInterface[];
  Capacitaciones: CapacitacionesInterface[];
  Capacitaciones2: CapacitacionesInterface[];
  nombre_empresa: string;
  public isAdmin: boolean = false;
  public isProfesional: boolean = false;
  public isEmpleado: boolean = false;
  rut_cliente: number;
  nombre_cliente: string;
  apellido_cliente: string;
  tel_cliente: number;
  nombre_usuario: string;
  password_profesional: string;
  empresa_id_empresa: number;
  tipo_usuario: number;
  profesional_rut_profesional: number;

  // Capacitacion
  fecha_visita: Date;
  desc_capacitacion: string;

  consultarNombreUsuario() {
    const dataUsuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    return dataUsuario.nombre_usuario;
  }

  consultarRutUsuario() {
    const dataUsuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    return dataUsuario.rut_cliente;
  }

  consultarNombreCliente() {
    const dataUsuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    return dataUsuario.nombre_cliente;
  }

  consultarTipoUsuario() {
    const dataUsuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    console.log(dataUsuario);
    return dataUsuario.tipo_usuario;
  }

  consultarPassword() {
    const dataUsuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    console.log(dataUsuario);
    return dataUsuario.password_usuario;
  }

  consultarIdEmpresa() {
    const dataUsuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    return dataUsuario.empresa_id_empresa;
  }

  checkAdmin(): void {
    if (this.consultarTipoUsuario() === 1) {
      this.isAdmin = false;
    } else if (this.consultarTipoUsuario() === 2) {
      this.isAdmin = true;
    } else if (this.consultarTipoUsuario() === 3) {
      this.isProfesional = true;
    } else {
      this.isProfesional = false;
    }
  }

  addAccidente() {
    if (
      this.descripcion_acc == undefined ||
      this.fecha_accidente == undefined
    ) {
      this.toastr.warning(
        'Rellene los datos correspondientes',
        'Campos Vacios'
      );
    } else {
      if (this.descripcion_acc == '' || this.fecha_accidente.toString() == '') {
        this.toastr.warning(
          'Rellene los datos correspondientes',
          'Campos Vacios'
        );
      } else {
        console.log('aqui');
        this.crudService
          .insertAccidente(
            this.descripcion_acc,
            this.fecha_accidente,
            this.consultarRutUsuario(),
            this.consultarNombreUsuario()
          )
          .subscribe((res: AccidenteInterface) => {
            window.location.reload();
            this.toastr.success(
              'Los Datos Han Sido Guardados',
              'Datos Guardados'
            );
          });
      }
    }
  }

  listarAccidente() {
    this.crudService
      .GetAccidentesByUser(this.consultarNombreUsuario())
      .subscribe((res: AccidentesInterface[]) => {
        this.Accidentes = res;
      });
  }

  listarAccidentes() {
    this.crudService.getAccidentes().subscribe((res: AccidentesInterface[]) => {
      this.Accidentes = res;
    });
  }

  listarUsuarios() {
    this.crudService.getUsers().subscribe((res: UsuarioInterface[]) => {
      this.Usuarios = res;
    });
  }

  listarProfesionales() {
    this.crudService
      .getProfesionales()
      .subscribe((res: ProfesionalInterface[]) => {
        this.Profesionales = res;
      });
  }

  getDataUser(
    rut_cliente,
    nombre_cliente,
    apellido_cliente,
    tel_cliente,
    nombre_usuario,
    empresa_id_empresa,
    tipo_usuario
  ) {
    this.rut_cliente = rut_cliente;
    this.nombre_cliente = nombre_cliente;
    this.apellido_cliente = apellido_cliente;
    this.tel_cliente = tel_cliente;
    this.nombre_usuario = nombre_usuario;
    this.empresa_id_empresa = empresa_id_empresa;
    this.tipo_usuario = tipo_usuario;
  }

  getDataCapacitacion(
    id_capacitacion,
    fecha_visita,
    desc_capacitacion,
    empresa_id_empresa,
    cliente_nombre_usuario,
    cliente_rut_cliente
  ) {
    this.id_capacitacion = id_capacitacion;
    this.fecha_visita = fecha_visita;
    this.desc_capacitacion = desc_capacitacion;
    this.empresa_id_empresa = empresa_id_empresa;
    this.cliente_nombre_usuario = cliente_nombre_usuario;
    this.cliente_rut_cliente = cliente_rut_cliente;
  }

  updateUser() {
    this.crudService
      .updateUser(
        this.rut_cliente,
        this.nombre_cliente,
        this.apellido_cliente,
        this.tel_cliente,
        this.nombre_usuario,
        this.empresa_id_empresa,
        this.tipo_usuario
      )
      .subscribe((res: UsuarioInterface[]) => {
        this.Usuarios = res;
        window.location.reload();
      });
    this.toastr.success(
      'Los datos han sido actualizados',
      'Datos Actualizados'
    );
  }

  addCapacitacion() {
    if (this.fecha_visita == undefined || this.desc_capacitacion == undefined) {
      this.toastr.warning(
        'Rellene los datos correspondientes',
        'Campos Vacios'
      );
    } else {
      if (this.fecha_visita.toString() == '' || this.desc_capacitacion == '') {
        this.toastr.warning(
          'Rellene los datos correspondientes',
          'Campos Vacios'
        );
      } else {
        this.crudService
          .insertCapacitacion(
            this.fecha_visita,
            this.desc_capacitacion,
            this.consultarIdEmpresa(),
            this.consultarNombreUsuario(),
            this.consultarRutUsuario()
          )
          .subscribe((res: CapacitacionInterface[]) => {
            this.Capacitacion = res;
            window.location.reload();
          });
        this.toastr.success('Los Datos Han Sido Guardados', 'Datos Guardados');
      }
    }
  }

  listarCapacitaciones() {
    this.crudService
      .getCapacitaciones()
      .subscribe((res: CapacitacionesInterface[]) => {
        this.Capacitaciones = res;
      });
  }

  listarCapacitacion() {
    this.crudService
      .getCapacitacionesByUser(this.consultarNombreUsuario())
      .subscribe((res: CapacitacionesInterface[]) => {
        this.Capacitaciones2 = res;
        console.log(this.Capacitaciones2);
      });
  }

  listarCapacitacionPorProfesional() {
    this.crudService
      .getCapacitacionesByProfesional(this.consultarRutUsuario())
      .subscribe((res: CapacitacionesInterface[]) => {
        this.Capacitaciones2 = res;
      });
  }

  capNoAsignadas() {
    this.crudService
      .getCapacitacionesNoAsignadas(this.consultarRutUsuario())
      .subscribe((res: CapacitacionesInterface[]) => {
        this.Capacitaciones = res;
      });
  }

  updateCapacitacion() {
    this.crudService
      .updateCapacitacion(
        this.id_capacitacion,
        this.fecha_visita,
        this.desc_capacitacion,
        this.profesional_rut_profesional,
        this.empresa_id_empresa,
        this.cliente_nombre_usuario,
        this.cliente_rut_cliente
      )
      .subscribe((res: CapacitacionesInterface[]) => {
        this.Capacitaciones2 = res;
        window.location.reload();
      });

    this.toastr.success(
      'Capacitación actualizada',
      'Actualización de Capacitación'
    );
  }

  addProfesional() {
    this.crudService
      .InsertProfesional(
        this.rut_cliente,
        this.nombre_cliente,
        this.apellido_cliente,
        this.tel_cliente,
        this.nombre_usuario
      )
      .subscribe((res: ProfesionalInterface[]) => {
        this.Profesionales = res;
        window.location.reload();
      });

    this.toastr.success('Profesional Asignado', 'Asignación Profesional');
  }

  deleteUser(rut_cliente) {
    this.toastr.error('Los datos han sido eliminados', 'Datos Eliminados');
    this.crudService
      .DeleteUser(rut_cliente)
      .subscribe((res: UsuarioInterface[]) => {
        this.Usuarios = res;
        window.location.reload();
      });
  }

  updatePro(rut_cliente) {
    this.crudService
      .updatePro(this.rut_cliente)
      .subscribe((res: UsuarioInterface[]) => {
        this.Usuarios = res;
      });
  }
}
