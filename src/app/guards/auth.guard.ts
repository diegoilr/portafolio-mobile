import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpresaService } from '../services/empresa.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authService: EmpresaService, private router: Router) { }

  canActivate() {

    if (this.authService.getCurrentUser()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }

}
