import { TestBed } from '@angular/core/testing';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { of } from 'rxjs';
import { AuthorizationService } from '../services/authorization/authorization.service';

describe('AuthInterceptor', () => {

  let authorizationService: AuthorizationService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      // {provide: HttpRequest},
      AuthInterceptor, HttpHandler,
      { provide: AuthorizationService, useValue: {
        tokenResponse:()=>of({accessToken:"1"}),tokenResponse2:()=>of({accessToken:"1"})} }
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    authorizationService = TestBed.inject(AuthorizationService);
    expect(interceptor).toBeTruthy();
  });
});
