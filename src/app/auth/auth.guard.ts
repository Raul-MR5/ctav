import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    if (localStorage.getItem('usuario')) {
      return true;
    }   

    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }
  
}
