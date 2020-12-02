import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { UsuarioInterface } from '../../models/usuario-interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./main.css', './util.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    public auth: EmpresaService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  nombre_usuario: string = '';
  password_usuario: string = '';

  login() {
    if (this.validarVacio() == true) {
      this.auth
        .LogIn(this.nombre_usuario, this.password_usuario)
        .subscribe((res) => {
          console.log(res);
          console.log(res['msg']);
          console.log(res['Datauser']);

          if (res['msg']) {
            let DataUser: UsuarioInterface = res['Datauser'];
            this.auth.setCurrentUser(DataUser);
            this.router.navigate(['/dashboard']).then(() => {
              window.location.reload();
            });
          } else {
            console.log('Credenciales Incorrectas');
            this.toastr.error('Ingrese Credenciales Correctas', 'Advertencia');
          }
        });
    } else {
      this.warningToastr();
    }
  }

  onNavigate() {
    this.router.navigate(['/register']).then(() => {
      window.location.reload();
    });
  }

  successToastr() {
    this.toastr.success('Inicie Sesión', 'Datos Correctos', {
      timeOut: 3000,
    });
  }

  warningToastr() {
    this.toastr.warning('Ingrese Credenciales Correspondientes', 'Advertencia');
  }
  validarVacio() {
    var validar: boolean;

    var nomUsuario = this.nombre_usuario;
    var passUsuario = this.password_usuario;

    if (nomUsuario != '' && passUsuario != '') {
      validar = true;
    } else {
      validar = false;
    }

    return validar;
  }
}
