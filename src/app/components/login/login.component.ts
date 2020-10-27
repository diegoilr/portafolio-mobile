import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { UsuarioInterface } from '../../models/usuario-interface';
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: EmpresaService, public router: Router) { }

  ngOnInit(): void {
  }

  nombre_usuario: string="";
  password_usuario: string="";

  login(){

    this.auth.LogIn(this.nombre_usuario, this.password_usuario).subscribe((res) => {
      console.log(res);
      console.log(res['msg']);
      console.log(res['Datauser']);

      if(res['msg']){
        let DataUser: UsuarioInterface = res['Datauser'];
        this.auth.setCurrentUser(DataUser);
        this.router.navigate(['/dashboard']).then(() => {
          window.location.reload();
        });

      }else {
        console.log('Credenciales Incorrectas');
      };
    });

  };

}
