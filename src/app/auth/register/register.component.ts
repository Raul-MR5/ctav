import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioSrv: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('usuario')) {
      this.router.navigate(['/']);
    }  
    
    this.form = this.formBuilder.group({
      id: [''],
      nombreUsuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")]],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', Validators.required],
      repeat_password: ['', Validators.required],
      rol: ['']
    });
  }

  submit(): void {
    var nUser: any = {
      id: this.form.value.id,
      nombreUsuario: this.form.value.nombreUsuario,
      password: this.form.value.password,
      email: this.form.value.email,
      nombre: this.form.value.nombre,
      rol: {
        rolNombre: 'ROLE_USER'
      }
    }

    this.usuarioSrv.create(nUser)
      .subscribe(
        () => {
          this.router.navigate(['/login']);
        }
      );
  }
}
