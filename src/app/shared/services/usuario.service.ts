import { Injectable } from '@angular/core';
import { Usuario } from '../../shared/models/usuario.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

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

  getAll(): Observable<Usuario[]> {    
    return this.http.get<Usuario[]>(`${environment.url}/usuarios/lista`, this.headers);
  }

  getOne(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.url}/usuarios/lista/${id}`, this.headers);
  }

  create(payload: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.url}/usuarios/create`, payload, this.headers);
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${environment.url}/usuarios/update/${usuario.id}`, usuario, this.headers);
  }

  delete(payload: number) {
    return this.http.delete(`${environment.url}/usuarios/delete/${payload}`, this.headers);
  }
}
