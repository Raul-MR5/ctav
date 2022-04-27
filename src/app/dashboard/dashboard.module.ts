import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';

import { AuthGuard } from '../auth/auth.guard';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('src/app/tablas/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard], pathMatch: "prefix"},
      { path: 'usuarios',  loadChildren: () => import('src/app/tablas/usuarios/usuario.module').then(m => m.UsuarioModule), canActivate: [AuthGuard]},
      // { path: 'lista',  loadChildren: () => import('src/app/ventanas/coches/chochelista/chochelista.module').then(m => m.ChochelistaModule), canActivate: [AuthGuard]},
      // { path: 'perifericos',  loadChildren: () => import('@app/features/components/backoffice/tablas/perifericos/perifericos.module').then(m => m.PerifericoModule), canActivate: [AuthGuard]},
      // { path: 'persona',  loadChildren: () => import('@app/features/components/backoffice/tablas/personas/persona.module').then(m => m.PersonaModule), canActivate: [AuthGuard]},
      // { path: 'hospital',  loadChildren: () => import('@app/features/components/backoffice/tablas/hospital/hospital.module').then(m => m.HospitalModule), canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    FormsModule,
    ReactiveFormsModule,

    HttpClientModule
  ],
  exports: [RouterModule]
})
export class DashboardModule { }
