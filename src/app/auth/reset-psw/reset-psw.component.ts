import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-psw',
  templateUrl: './reset-psw.component.html',
  styleUrls: ['./reset-psw.component.scss']
})
export class ResetPswComponent implements OnInit {

  form: FormGroup;

  private token: string;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authSrv: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {// Validacion de si existe en local storage 'usuasio', si existe redireccion a /
    if (localStorage.getItem('usuario')) {
      this.router.navigate(['/']);
    }    

    this.route.params.subscribe((params: Params) => this.token = params['token']);

    console.log(this.token);
    

    this.form = this.formBuilder.group({
      password: '',
      repeatPassword: ''
    });
  }
  
  submit(): void {    
    this.authSrv.recuperarPassword(this.form.value.password, this.token)
    .subscribe(
      () => {
        this.router.navigate(['/']);
      }
    );
  }
}
