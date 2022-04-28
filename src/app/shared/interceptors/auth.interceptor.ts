import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthorizationService} from '../services/authorization/authorization.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authorizationService: AuthorizationService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.authorizationService.isUserLoggedIn()) {
      this.authorizationService.signOut();
      return next.handle(request);
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authorizationService.userAccessToken}`
      },
      setParams: {
        branchId: this.authorizationService.getActiveBranch?.branchId
      },
    });

    return next.handle(request);
  }
}
