import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authSrv: AuthService,
  ) {}

  ngOnInit(): void {// Validacion de si existe en local storage 'usuasio', si existe redireccion a /
    if (localStorage.getItem('usuario')) {
      this.router.navigate(['/']);
    }    

    this.form = this.formBuilder.group({
      user: '',
      password: ''
    });
  }
  
  submit(): void {    
    this.authSrv.login(this.form.value.user, this.form.value.password)
    .subscribe(
      () => {
        this.router.navigate(['/']);
      }
    );
  }
}
