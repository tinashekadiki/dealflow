import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authorizationService: AuthorizationService;
  let spyRouter: { navigate: jasmine.Spy }
  let isLoggedIn = false;

  beforeEach(() => {
    spyRouter = jasmine.createSpyObj("Router", ['navigate'])
    TestBed.configureTestingModule({
      providers: [AuthGuard, Injectable,
        { provide: Router, useValue: spyRouter },
        {
          provide: AuthorizationService, useValue: {
            isUserLoggedIn: () => isLoggedIn,
            signOut: () => { }
          }
        }]
    });
    guard = TestBed.inject(AuthGuard);
    authorizationService = TestBed.inject(AuthorizationService);
  });

  it('should be created', () => {
    expect(guard.isLoggedIn).toBeTruthy();
  });

  describe("#canActivate()", () => {
    it("should call #isLoggedIn()", () => {
      spyOn(guard, "isLoggedIn")

      guard.canActivate()

      expect(guard.isLoggedIn).toHaveBeenCalled();
    })
  })

  describe("#canActivateChild()", () => {
    it("should call #isLoggedIn()", () => {
      spyOn(guard, "isLoggedIn")

      guard.canActivateChild()

      expect(guard.isLoggedIn).toHaveBeenCalled();
    })
  })

  describe("#isLoggedIn()",()=>{
    it("should call #signOut(), #navigate login, and return false if user is not logged in", ()=>{
      isLoggedIn = false;
      spyOn(authorizationService,"signOut")

      let result = guard.isLoggedIn();

      expect(result).toBeFalse();
      expect(spyRouter.navigate).toHaveBeenCalledWith(["login"]);
      expect(authorizationService.signOut).toHaveBeenCalled();
    })
    it("should not call #signOut(), #navigate login, and return true if user is logged in", ()=>{
      isLoggedIn = true;
      spyOn(authorizationService,"signOut")

      let result = guard.isLoggedIn();

      expect(result).toBeTrue();
      expect(spyRouter.navigate).not.toHaveBeenCalledWith(["login"]);
      expect(authorizationService.signOut).not.toHaveBeenCalled();
    })
  });
});
