import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario.component';
import { RouterModule, Routes } from '@angular/router';

import {TableModule} from 'primeng/table';

import { AuthGuard } from '../../auth/auth.guard';
import { EditComponent } from './edit/edit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { GetSelectedPipe } from 'src/app/pipe/get-selected.pipe';

const routes: Routes = [
  { path: '', component: UsuarioComponent, canActivate: [AuthGuard], pathMatch: "full" },
  { path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard], pathMatch: "full" }
];

@NgModule({
  declarations: [
    UsuarioComponent,
    EditComponent,
    GetSelectedPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    TableModule,

    FormsModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  exports: [RouterModule]
})
export class UsuarioModule { }
