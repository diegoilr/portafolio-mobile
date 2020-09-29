import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: EmpresaService) { }

  ngOnInit(): void {
  }

  nombre_usuario: string="";
  password_usuario: string="";

  login(){
    this.auth.LogIn(this.nombre_usuario, this.password_usuario).subscribe((res)=>{
      console.log(res);
    })
  }

}
