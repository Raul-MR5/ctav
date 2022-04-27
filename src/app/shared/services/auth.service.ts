import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
// import * as jwt_decode from 'jwt-decode';
import { Permiso } from '../models/permiso.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: any;

  constructor(
    private http: HttpClient
  ) { }
  
  login(username: String, password: String) {
    return this.http.post<any>(`${environment.url}/auth/login`, {"nombreUsuario": username, "password": password})
      .pipe(
        map((usuario : any) => {
          this.user = usuario;
          localStorage.setItem('usuario', JSON.stringify(usuario));
          return usuario;
        })      
      );
  }

  logout() {
    localStorage.removeItem('usuario');
  }

  solicitarPassword(email: string): Observable<string> {
    return this.http.post<any>(`${environment.url}/email-password/send`, {"mailTo": email});
  }

  recuperarPassword(password: string, token: string): Observable<string> {
    return this.http.post<any>(`${environment.url}/email-password/change-password`, {"password": password, "confirmPassword": password, "tokenPassword": token});
  }

  getUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.url}/account`);
  }

  getPermisos(): any[] {
    return JSON.parse(localStorage.getItem('usuario')).authorities;
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem('usuario')).token;
  }
}
