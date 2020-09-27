import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

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
  // TO DO: UPDATE EMPRESAS
  // TO DO: DELETE EMPRESAS
}
