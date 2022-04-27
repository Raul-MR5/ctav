import { Injectable } from '@angular/core';
import { Foto } from '../models/foto.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FotoService { 
  
  private auth_token: string | undefined;

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.auth_token = this.authService.getToken();
  }

  get headers(){
    return {
      headers: {
        'Authorization': `Bearer ${this.auth_token}`,
        'Content-Type': 'application/json'
      }
    }
  }

  getAll(): Observable<Foto[]> {    
    return this.http.get<Foto[]>(`${environment.url}/foto/lista`, this.headers);
  }

  getOne(id: number): Observable<Foto> {
    return this.http.get<Foto>(`${environment.url}/foto/lista/${id}`, this.headers);
  }

  create(payload: Foto): Observable<Foto> {
    return this.http.post<Foto>(`${environment.url}/foto/create`, payload, this.headers);
  }

  update(foto: Foto): Observable<Foto> {
    return this.http.put<Foto>(`${environment.url}/foto/update/${foto.id}`, foto, this.headers);
  }

  delete(payload: number) {
    return this.http.delete(`${environment.url}/foto/delete/${payload}`, this.headers);
  }
}
