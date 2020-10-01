import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioInterface } from '../models/usuario-interface';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient, public router: Router) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type":"application/json"
  })

  // TODO: GET EMPRESAS
  GetEmpresas(){
    const url="http://localhost:3000/getEmpresas";
    return this.http.get(url);
  }
  // TODO: INSERT EMPRESAS
  InsertEmpresa(id_empresa:number,nombre_empresa:string){
    const url="http://localhost:3000/addEmpresa";
    return this.http.post(url,
      {
        "id_empresa": id_empresa,
        "nombre_empresa": nombre_empresa
      },
      {headers:this.headers}
      ).pipe(map(data=>data));
  }

  // TODO: UPDATE EMPRESAS
  UpdateEmpresa(id_empresa:number,nombre_empresa:string){
    const url="http://localhost:3000/updateEmpresa";
    return this.http.put(url,
      {
        "id_empresa": id_empresa,
        "nombre_empresa": nombre_empresa
      },
      {headers:this.headers}
      ).pipe(map(data=>data));
  }



  // TODO: DELETE EMPRESAS
  DeleteEmpresa(id_empresa){
    const url="http://localhost:3000/deleteEmpresa/" + id_empresa;

    return this.http.delete(url).pipe(map(data=>data));
  }


  // TODO: LOGIN

  LogIn(nombre_usuario, password_usuario){
    const url ="http://localhost:3000/signup"

    return this.http.post(url,
      {nombre_usuario, password_usuario},
      {headers: this.headers})
      .pipe(map( data => data));
  }

  // TODO: SET CURENT USER
  setCurrentUser(usuario: UsuarioInterface){
    let usuario_string = JSON.stringify(usuario);
    localStorage.setItem('usuarioLogeado',usuario_string);
  }

  // TODO: GET CURENT USER
  getCurrentUser(){
    let userCurrent = localStorage.getItem('usuarioLogeado');
    if(userCurrent != null){
      let user_json=JSON.parse(userCurrent);
      return user_json;
    }else{
      return null;
    }
  }

  // TODO: LOGOUT

  logout(){
    localStorage.removeItem('usuarioLogeado')
    this.router.navigate(['/'])
  }
}
