import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: EmpresaService, private router: Router) { }

  public app_name = "No Más Accidentes";
  public isLogged: boolean = false;
  public dataUsuario = [];

  ngOnInit() {
    this.onCheckUser();
  }

  cerrarSesion(){
    this.auth.logout();
    this.router.navigate(['/'])
  .then(() => {
    window.location.reload();
  });

  }


  onCheckUser(): void{
    if(this.auth.getCurrentUser() === null){
      this.isLogged = false;

    } else {
      this.isLogged = true;
    }
  }

  consultarNombreUsuario(){
    const dataUsuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    return dataUsuario.nombre_cliente;
  }


}
