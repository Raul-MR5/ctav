import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../auth/auth.guard';

import { TableModule } from 'primeng/table';
import {ToastModule} from 'primeng/toast';

import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
import { SafePipe } from 'src/app/pipe/safe.pipe';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     { path: 'update', component: UpdateComponent, canActivate: [AuthGuard] },
  //     { path: 'create', component: CreateComponent, canActivate: [AuthGuard] }
  //   ]
  // }
  { path: '', component: HomeComponent, canActivate: [AuthGuard], pathMatch: "full" },
  { path: 'update/:id', component: UpdateComponent, canActivate: [AuthGuard], pathMatch: "full"},
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard], pathMatch: "full"}
];

@NgModule({
  declarations: [
    HomeComponent,
    UpdateComponent,
    CreateComponent,

    SafePipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    TableModule,
    ToastModule,
    FileUploadModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  exports: [RouterModule, SafePipe]
})
export class HomeModule { }
