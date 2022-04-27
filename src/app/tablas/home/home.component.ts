import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/shared/services/evento.service';

import { Evento } from 'src/app/shared/models/evento.model';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Permiso } from 'src/app/shared/models/permiso.model';
import { Foto } from 'src/app/shared/models/foto.model';

// import * as fromAccount from 'src/app/shared/state/account/account.reducer';
// import { Action as accountActions } from 'src/app/shared/state/account/account.actions';

// import { Store } from '@ngrx/store';
// import { Action as usuarioActions } from '../../usuarios/state/usuario.actions';
// import * as fromUsuario from '../../usuarios/state/usuario.reducer';
// import { Action as cocheActions } from '../state/coche.actions';
// import * as fromCoche from '../state/coche.reducer';

// import { Observable } from 'rxjs';
// import { RequestFilter } from 'src/app/shared/models/request-filter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  eventos: Evento[];
  fotos: Foto[];

  edit: boolean = true;

  permisos: any[] = this.authSrv.getPermisos();
  //permiso: Permiso;

  // entities$: Observable<Evento[]> = this.eventoSrv.getAll();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private eventoSrv: EventoService,
    private authSrv: AuthService
  ) { }

  ngOnInit(): void {
    // this.entities$.subscribe(e => {
    //   if (e) {
    //     this.eventos = e;
    //   };
    //   console.log(e);
    // });

    this.eventoSrv.getAll().subscribe(e => {
      if (e) {
        this.eventos = e;
      };
      console.log(e);
    });
  }

  ngOnDestroy(): void {
  }

  logout() {
    this.authSrv.logout()
    this.router.navigate(['/login']);
  }

  haveAuth(auth: string): boolean {
    if (this.permisos.find(e => e.authority == auth)) {
      return true;
    }

    return false;
  }

  goTo(url: string) {
    this.router.navigate(['/' + url]);
  }

  getFotos(evento) {
    // if (evento.fotos.length > 0) {
    //   console.log(evento);
      
      return evento.fotos[0].archivo
    // }
    // return 
  }

  delete(id) {
    this.eventoSrv.delete(id).subscribe();

    location.reload()
  }
}
