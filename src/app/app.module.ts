import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPswComponent } from './auth/reset-psw/reset-psw.component';
import { SendEmailComponent } from './auth/send-email/send-email.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService, PrimeNGConfig, } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { GetSelectedPipe } from './pipe/get-selected.pipe';

@NgModule({
  declarations: [
    AppComponent,    
    LoginComponent,
    RegisterComponent,
    ResetPswComponent,
    SendEmailComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule
  ],
  providers: [
    MessageService,
    PrimeNGConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
