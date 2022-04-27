import { Injectable } from '@angular/core';
import { Evento } from '../models/evento.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService { 
  
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

  getAll(): Observable<Evento[]> {    
    return this.http.get<Evento[]>(`${environment.url}/evento/lista`, this.headers);
  }

  getOne(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${environment.url}/evento/lista/${id}`, this.headers);
  }

  create(payload: Evento): Observable<Evento> {
    return this.http.post<Evento>(`${environment.url}/evento/create`, payload, this.headers);
  }

  update(evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${environment.url}/evento/update/${evento.id}`, evento, this.headers);
  }

  delete(payload: number) {
    return this.http.delete(`${environment.url}/evento/delete/${payload}`, this.headers);
  }
}
