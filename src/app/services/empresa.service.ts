import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioInterface } from '../models/usuario-interface';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type":"application/json"
  })

  // TO DO: GET EMPRESAS
  GetEmpresas(){
    const url="http://localhost:3000/getEmpresas";
    return this.http.get(url);
  }
  // TO DO: INSERT EMPRESAS
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

  // TO DO: UPDATE EMPRESAS
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



  // TO DO: DELETE EMPRESAS
  DeleteEmpresa(id_empresa){
    const url="http://localhost:3000/deleteEmpresa/" + id_empresa;

    return this.http.delete(url).pipe(map(data=>data));
  }


  // TO DO: LOGIN

  LogIn(nombre_usuario, password_usuario){
    const url ="http://localhost:3000/signup"

    return this.http.post(url,
      {
        "nombre_usuario": nombre_usuario,
        "password_ususario": password_usuario
      }
      ,{headers: this.headers}).pipe(map(data=>data));
  }

  // TO DO: SET CURENT USER
  setCurrentUser(usuario: UsuarioInterface){
    let usuario_string = JSON.stringify(usuario);
    localStorage.setItem('usuarioLogeado',usuario_string);
  }

  // TO DO: GET CURENT USER
  getCurrentUser(){
    let userCurrent = localStorage.getItem('usuarioLogeado');
    if(!isNullOrUndefined(userCurrent)){
      let user_json=JSON.parse(userCurrent);
      return user_json;
    }else{
      return null;
    }
  }

  // TO DO: LOGOUT
}
