import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authSrv: AuthService,
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('usuario')) {
      this.router.navigate(['/']);
    }    

    this.form = this.formBuilder.group({
      email: ''
    });
  }
  
  submit(): void {    
    this.authSrv.solicitarPassword(this.form.value.email)
    .subscribe(
      () => {
        this.router.navigate(['/']);
      }
    );
  }
}
