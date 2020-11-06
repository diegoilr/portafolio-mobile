import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioInterface } from '../models/usuario-interface';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient, public router: Router) { }

  get refresh$(){
    return this._refresh$;
  }

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
    this.router.navigate(['/home'])
  }

  //TODO: REGISTRO DE USUARIO
  InsertUsuario(rut_cliente: number, nombre_cliente: string, apellido_cliente: string, tel_cliente: number, nombre_usuario: string, password_usuario: string, empresa_id_empresa: number){
    const url="http://localhost:3000/addUser";
    return this.http.post(url,
      {
        "rut_cliente": rut_cliente,
        "nombre_cliente": nombre_cliente,
        "apellido_cliente": apellido_cliente,
        "tel_cliente": tel_cliente,
        "nombre_usuario": nombre_usuario,
        "password_usuario": password_usuario,
        "empresa_id_empresa": empresa_id_empresa
      },
      {headers:this.headers}
      ).pipe(map(data=>data));

  }

  InsertProfesional(rut_profesional: number, nombre_profesional: string, apellido_profesional: string, tel_profesional: number, usuario_profesional: string){
    const url="http://localhost:3000/addProfesional";
    return this.http.post(url,
      {
        "rut_profesional": rut_profesional,
        "nombre_profesional": nombre_profesional,
        "apellido_profesional": apellido_profesional,
        "tel_profesional": tel_profesional,
        "usuario_profesional": usuario_profesional
      },
      {headers:this.headers}
      ).pipe(map(data=>data));
  }

  DeleteUser(rut_cliente){
    const url="http://localhost:3000/deleteUser/" + rut_cliente;

    return this.http.delete(url).pipe(map(data=>data));
  }

  updatePro(rut_cliente){
    const url="http://localhost:3000/updatePro/" + rut_cliente;
    return this.http.put(url,
      {
        "rut_cliente": rut_cliente,
      },
      {headers:this.headers}
      ).pipe(map(data=>data));
  }

  // TODO: addACCIDENTE

  insertAccidente(descripcion_acc: string, fecha_accidente: Date, cliente_rut_cliente: number, cliente_nombre_usuario: string){
    const url ="http://localhost:3000/addAccidente";
    return this.http.post(url,{
      "descripcion_acc" : descripcion_acc,
      "fecha_accidente" : fecha_accidente,
      "cliente_rut_cliente" : cliente_rut_cliente,
      "cliente_nombre_usuario" : cliente_nombre_usuario,
    },
    {headers:this.headers}
    ).pipe(map(data=>data));
  }


  //TODO: gerAccidente por nombre de Usuario
  GetAccidentesByUser(cliente_nombre_usuario){
    const url="http://localhost:3000/getAccidente/" + cliente_nombre_usuario;
    return this.http.get(url);
  }

  getAccidentes(){
    const url="http://localhost:3000/getAccidentes";
    return this.http.get(url);
  }


  getUsers(){
    const url="http://localhost:3000/getUsers";
    return this.http.get(url);
  }

  getProfesionales(){
    const url="http://localhost:3000/getProfesionales";
    return this.http.get(url);
  }

  updateUser(rut_cliente: number, nombre_cliente: string, apellido_cliente: string, tel_cliente: number, nombre_usuario: string, empresa_id_empresa: number, tipo_usuario: number){
    const url="http://localhost:3000/updateUser";
    return this.http.put(url,
      {
        "rut_cliente": rut_cliente,
        "nombre_cliente": nombre_cliente,
        "apellido_cliente": apellido_cliente,
        "tel_cliente": tel_cliente,
        "nombre_usuario": nombre_usuario,
        "empresa_id_empresa": empresa_id_empresa,
        "tipo_usuario": tipo_usuario,
      },
      {headers:this.headers}
      ).pipe(map(data=>data));

  }



  // CAPACITACION

  insertCapacitacion(fecha_visita: Date, desc_capacitacion: string, empresa_id_empresa: number, cliente_nombre_usuario: string, cliente_rut_cliente: number){
    const url ="http://localhost:3000/addCapacitacion";
    return this.http.post(url,{
      "fecha_visita" : fecha_visita,
      "desc_capacitacion" : desc_capacitacion,
      "empresa_id_empresa" : empresa_id_empresa,
      "cliente_nombre_usuario" : cliente_nombre_usuario,
      "cliente_rut_cliente" : cliente_rut_cliente
    },
    {headers:this.headers}
    ).pipe(map(data=>data));

  }

  getCapacitaciones(){
    const url="http://localhost:3000/getCapacitaciones";
    return this.http.get(url);
  }

  getCapacitacionesByUser(cliente_nombre_usuario){
    const url="http://localhost:3000/getCapacitacion/" + cliente_nombre_usuario;
    return this.http.get(url);
  }

  updateCapacitacion(id_capacitacion: number, fecha_visita: Date, desc_capacitacion: string, profesional_rut_profesional: number, empresa_id_empresa: number, cliente_nombre_usuario: string, cliente_rut_cliente: number){
    const url="http://localhost:3000/updateCapacitacion";
    return this.http.put(url,
      {
        "id_capacitacion": id_capacitacion,
        "fecha_visita": fecha_visita,
        "desc_capacitacion": desc_capacitacion,
        "profesional_rut_profesional": profesional_rut_profesional,
        "empresa_id_empresa": empresa_id_empresa,
        "cliente_nombre_usuario": cliente_nombre_usuario,
        "cliente_rut_cliente": cliente_rut_cliente
      },
      {headers:this.headers}
      ).pipe(map(data=>data));

  }
}
