import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLogin implements CanActivate {

  constructor(private service: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (!this.service.loggedIn()) {
      return true;
    } else {
      if (this.service.whoIsLogged === 'teacher') {
        this.router.navigate(['/students']);
        return false;
      } else {
          this.router.navigate(['/myprofile']);
          return false;
        }
    }
  }
}
