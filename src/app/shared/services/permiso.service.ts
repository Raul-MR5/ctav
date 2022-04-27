import { Injectable } from '@angular/core';
import { Permiso } from '../models/permiso.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  private auth_token: string | undefined;

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.auth_token = this.authService.getToken();
  }

  get headers(){
    return {
      headers: {
        'Authorization': `Bearer ${this.auth_token}`,
      }
    }
  }

  getAll(): Observable<Permiso[]> {    
    return this.http.get<Permiso[]>(`${environment.url}/permisos/lista`, this.headers);
  }

  getOne(nombre: string): Observable<Permiso> {
    return this.http.get<Permiso>(`${environment.url}/permisos/lista/${nombre}`, this.headers);
  }

  // getOne(id: number): Observable<Rol> {
  //   return this.http.get<Rol>(`${environment.url}/roles/lista/${id}`, this.headers);
  // }

  // create(payload: Rol): Observable<Rol> {
  //   return this.http.post<Rol>(`${environment.url}/roles/create`, payload, this.headers);
  // }

  // update(rol: Rol): Observable<Rol> {
  //   return this.http.put<Rol>(`${environment.url}/roles/update/${rol.id}`, rol, this.headers);
  // }

  // delete(payload: number) {
  //   return this.http.delete(`${environment.url}/roles/delete/${payload}`, this.headers);
  // }
}
