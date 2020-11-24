import { ToastrService } from 'ngx-toastr';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { EmpresaInterface } from '../../models/empresa-interface';
import { UsuarioInterface } from '../../models/usuario-interface';
import { Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { isEmpty } from 'rxjs/operators';
import { equal } from 'assert';
// import 'bootstrap';
// import 'bootstrap/js/dist/util';
// import 'bootstrap/js/dist/dropdown';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    public crudService: EmpresaService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  successToastr() {
    this.toastr.success('Inicie Sesión', 'Datos Correctos', {
      timeOut: 3000,
    });
  }

  errorToastr() {
    this.toastr.error('Faltan Datos', 'Datos Erroneos');
  }

  ngOnInit(): void {
    this.crudService.GetEmpresas().subscribe((res: EmpresaInterface[]) => {
      this.Empresas = res;
    });
  }

  id_empresa: number = 0;
  nombre_empresa: string = '';
  Empresas: EmpresaInterface[] = [];
  rut_cliente: number;
  nombre_cliente: string = '';
  apellido_cliente: string = '';
  tel_cliente: number;
  nombre_usuario: string = '';
  password_usuario: string = '';
  empresa_id_empresa: number;
  Usuarios: UsuarioInterface[] = [];

  public customPatterns = { '0': { pattern: new RegExp('[0-9]') } };

  validarVacio() {
    var validar: boolean;

    var rutCliente = this.rut_cliente;
    var nombreCliente = this.nombre_cliente;
    var apellidoCliente = this.apellido_cliente;
    var fonoCliente = this.tel_cliente;
    var nomUsuario = this.nombre_usuario;
    var passUsuario = this.password_usuario;
    var empresaCliente = this.empresa_id_empresa;

    if (
      rutCliente != 0 &&
      nombreCliente != '' &&
      apellidoCliente != '' &&
      fonoCliente != 0 &&
      nomUsuario != '' &&
      passUsuario != '' &&
      empresaCliente > 0
    ) {
      validar = true;
    } else {
      validar = false;
    }

    return validar;
  }

  addUsuario() {
    if (this.validarVacio() == true) {
      this.crudService
        .InsertUsuario(
          this.rut_cliente,
          this.nombre_usuario,
          this.apellido_cliente,
          this.tel_cliente,
          this.nombre_usuario,
          this.password_usuario,
          this.empresa_id_empresa
        )
        .subscribe((res: UsuarioInterface) => {
          this.successToastr();
        });
      this.router.navigate(['/login']).then(() => {
        this.successToastr();
        window.location.reload();
      });
    } else {
      this.errorToastr();
      console.log('Faltan datos');
    }
  }
}
