import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { EmpresaInterface } from '../../models/empresa-interface';
import { UsuarioInterface } from '../../models/usuario-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public crudService: EmpresaService, private router:Router) { }

  ngOnInit(): void {
    this.crudService.GetEmpresas().subscribe((res: EmpresaInterface[]) =>
    {
      this.Empresas = res;
    })
  }


  id_empresa: number = 0;
  nombre_empresa: string = "";
  Empresas: EmpresaInterface[] = [];
  rut_cliente: number;
  nombre_cliente: string = "";
  apellido_cliente: string = "";
  tel_cliente: number = 0;
  nombre_usuario: string = "";
  password_usuario: string = "";
  empresa_id_empresa: number;
  Usuarios: UsuarioInterface[] = []

  addUsuario(){
    this.crudService.InsertUsuario(this.rut_cliente, this.nombre_usuario, this.apellido_cliente, this.tel_cliente, this.nombre_usuario, this.password_usuario, this.empresa_id_empresa).subscribe((res: UsuarioInterface) =>{

    });
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
