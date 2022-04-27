import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  permisos: any[] = this.authSrv.getPermisos();

  constructor(
    private router: Router,
    private authSrv: AuthService
  ) { }

  ngOnInit(): void {
  }

  goTo(url: string) {
    this.router.navigate([url]);
  }

  haveAuth(auth: string): boolean {
    if (this.permisos.find(e => e.authority == auth)) {
      return true;
    }

    return false;
  }
}
