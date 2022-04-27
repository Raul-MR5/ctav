import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Usuario } from 'src/app/shared/models/usuario.model';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Permiso } from 'src/app/shared/models/permiso.model';
import { PermisoService } from 'src/app/shared/services/permiso.service';
import { Rol } from 'src/app/shared/models/rol.model';
import { RolService } from 'src/app/shared/services/rol.service';
import { ThisReceiver } from '@angular/compiler';

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
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  form: FormGroup;
  usuario: Usuario;
  id: number;

  edit: boolean = true;
  selected: boolean = true;
  checked: boolean = true;

  rolUser: Rol = null;

  checkArray = new FormArray([])

  roles: any[] = [];
  permisos: any[] = [];

  permisosAuth: any[] = this.authSrv.getPermisos();
  userPermisos: any[] = [];
  rolPermisos: any[] = [];
  //permiso: Permiso;

  entities$: Observable<Usuario[]> = this.usuarioSrv.getAll();
  rolEntities$: Observable<Rol[]> = this.rolSrv.getAll();
  permisoEntities$: Observable<Permiso[]> = this.permisoSrv.getAll();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,

    private usuarioSrv: UsuarioService,
    private rolSrv: RolService,
    private permisoSrv: PermisoService,
    private authSrv: AuthService
  ) { }

  ngOnInit(): void {
    //this.entities$.subscribe(e => { if (e) { this.usuarios = e };/*  console.log(e); */ });

    this.activatedRoute.params.subscribe((params: Params) => this.id = params['id']);
    this.usuarioSrv.getOne(this.id).subscribe(e => {
      if (e) {
        this.usuario = e;

        for (let i = 0; i < e.permisos.length; i++) {
          this.userPermisos.push(e.permisos[i]);
        }

        for (let i = 0; i < e.rol.permisos.length; i++) {
          this.userPermisos.push(e.rol.permisos[i]);
        }
      };

      this.rolUser = this.usuario.rol
      console.log(this.rolUser);

      const permisos: FormArray = this.form.get('permisos') as FormArray;

      for (let i = 0; i < this.userPermisos.length; i++) {
        permisos.push(new FormControl(this.userPermisos[i]))
      }

      this.form.patchValue({
        id: this.usuario.id,
        nombreUsuario: this.usuario.nombreUsuario,
        email: this.usuario.email,
        rol: this.usuario.rol
      })

      // console.log(this.userPermisos, this.usuario, e.rol.permisos);
    });

    this.rolEntities$.subscribe(e => { if (e) { this.roles = e }; console.log(e); });

    this.permisoEntities$.subscribe(e => { if (e) { this.permisos = e; this.permisos.sort(this.SortArray) }; console.log(e); });

    if (!this.haveAuth('WRITE_ADMIN')) {
      this.router.navigate(['/']);
    }

    this.form = this.formBuilder.group({
      id: '',
      nombreUsuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
      permisos: new FormArray([])
    });
  }

  ngOnDestroy(): void {
  }

  logout() {
    this.authSrv.logout()
    this.router.navigate(['/login']);
  }

  getPermisos(permiso: Permiso): boolean {
    if (this.userPermisos.find(e => e.nombre == permiso.nombre)) {
      return true;
    }

    return false;
  }

  getRolPermiso(permiso: Permiso) {
    if (this.rolUser.rolNombre == 'ROLE_ADMIN') {
      return true
    } else {
      if (this.rolUser.permisos.find(e => e.nombre == permiso.nombre)) {
        return true;
      }
      return false;
    }
  }

  changeRol(event) {
    this.rolSrv.getOne(event.target.value).subscribe(e => {

      if (e) {
        const permisos: FormArray = this.form.get('permisos') as FormArray;

        let x: number = permisos.controls.length
        
        for (x; x >= 0; x--) {          
          permisos.removeAt(x)
        }

        this.rolUser = e;
        const algo = e.permisos;
        this.userPermisos = [...algo];

        for (let i = 0; i < this.usuario.permisos.length; i++) {
          if (!this.userPermisos.find(e => e.nombre == this.usuario.permisos[i].nombre)) {
            this.userPermisos.push(this.usuario.permisos[i])
          }
        }

        for (let i = 0; i < this.userPermisos.length; i++) {
          permisos.push(new FormControl(this.userPermisos[i]))
        }
      }
    })
  }

  haveAuth(auth: string): boolean {
    if (this.permisosAuth.find(e => e.authority == auth)) {
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

  send(f) {
    console.log(f);

    let pextra: Permiso[] = []

    console.log(f.value.permisos);
    

    for (let i = 0; i < f.value.permisos.length; i++) {
      if (!this.rolUser.permisos.find(e => e.nombre == f.value.permisos[i].nombre)) {
        pextra.push(f.value.permisos[i])
      }
    }

    let user: Usuario = {
      id: f.value.id,
      nombreUsuario: f.value.nombreUsuario,
      nombre: this.usuario.nombre,
      email: f.value.email,
      password: this.usuario.password,
      rol: this.rolUser,
      permisos: pextra
    }


    console.log(user);
    this.usuarioSrv.update(user).subscribe(()=>{this.router.navigate(['/usuarios']);})

    
  }

  compare(ob1, ob2) {
    console.log(ob1);

    return (ob1.id == ob2.id)
  }

  SortArray(x, y) {    
    if (x.nombre < y.nombre) { return -1; }
    if (x.nombre > y.nombre) { return 1; }
    return 0;
  }

  onCheckboxChange(e) {
    console.log(e.target.id);

    const permisos: FormArray = this.form.get('permisos') as FormArray;
    if (e.target.checked) {
      this.permisoSrv.getOne(e.target.id).subscribe(e => {

        let p: Permiso = {
          id: e.id,
          nombre: e.nombre
        }
        
        permisos.push(new FormControl(p));
      })
    } else {
      let i: number = 0;
      permisos.controls.forEach((item: FormControl) => {
        if (item.value.nombre == e.target.id) {
          permisos.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
