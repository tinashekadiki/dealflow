import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthorizationService, private router: Router){}

  canActivate(): boolean {
    return this.isLoggedIn();
  }
  canActivateChild(): boolean {
      return this.isLoggedIn();
  }

  isLoggedIn(){
    if(!this.authService.isUserLoggedIn()) {
      this.authService.signOut();
      this.router.navigate(['login']);
      return false;
    }
    
    return true;
  }
  
}
