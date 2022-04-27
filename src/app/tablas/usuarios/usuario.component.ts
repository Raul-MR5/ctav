import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

import { Usuario } from 'src/app/shared/models/usuario.model';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Permiso } from 'src/app/shared/models/permiso.model';

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
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  form: FormGroup;
  usuarios: Usuario[];

  edit: boolean = true;

  permisos: any[] = this.authSrv.getPermisos();
  //permiso: Permiso;

  entities$: Observable<Usuario[]> = this.usuarioSrv.getAll();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private usuarioSrv: UsuarioService,
    private authSrv: AuthService
  ) { }

  ngOnInit(): void {
    this.entities$.subscribe(e => { if (e) { this.usuarios = e };/*  console.log(e); */});

    if (!this.haveAuth('READ_ADMIN')) {
      this.router.navigate(['/']);        
    }
    // this.usuarioSrv.getAll().subscribe(e => console.log(e));
  }

  ngOnDestroy(): void {
  }

  logout() {
    this.authSrv.logout()
    this.router.navigate(['/login']);
  }

  getPermisos(usuario) {
    let permisosUser = ``;

    // for (let i = 0; i < usuario.rol.permisos.length; i++) {
    //   permisosUser += usuario.rol.permisos[i].nombre + `, `
    // }
    if (usuario.permisos.length != 0) {
      permisosUser = `[`;
      for (let i = 0; i < usuario.permisos.length; i++) {
        if (i == (usuario.permisos.length - 1)) {
          permisosUser += usuario.permisos[i].nombre
        } else {
          permisosUser += usuario.permisos[i].nombre + `, `
        }
      }
      permisosUser += `]`
    }

    return permisosUser;
  }

  haveAuth(auth: string): boolean {
    if (this.permisos.find(e => e.authority == auth)) {
      return true;
    }

    return false;
  }

  authUser(nombre): boolean {
    if (nombre == JSON.parse(localStorage.getItem('usuario')).nombreUsuario) {
      return false
    }
    
    return true
  }

  delete(id) {
    this.usuarioSrv.delete(id).subscribe();
    
    location.reload()
  }

  goTo(url: string) {
    this.router.navigate(['/usuarios/' + url]);
  }
}
