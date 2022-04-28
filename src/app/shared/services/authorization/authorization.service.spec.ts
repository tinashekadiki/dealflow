import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AuthorizationService } from './authorization.service';
import {default as PermissionsJSON} from '../../../testing/json/permissions.json';
import {default as AuthenticatedUserJSON} from '../../../testing/json/authenticated_user.json';
import { AuthenticatedUser, User } from '../../models/authorization/authenticated_user';
import { environment } from 'src/environments/environment';
import { SecureStorageService } from '../secure-storage/secure-storage.service';

describe('AuthorizationService', () => {
  let service: AuthorizationService;
  let secureStorageService: SecureStorageService;
  let store = {};
  const secureStorage = {
    getItem: function (key:string):string {
      return store[key]==undefined?null:store[key];
    },
    setItem:function (key, value) {
      let item:string;
      if(typeof value === "string"){
        item = value
      }else{
        item = JSON.stringify(value);
      }
        store[key] = item;
    },
    removeItem:function (key) {
      delete store[key]
    },
  }

  let permissionObj:User = PermissionsJSON;
  let authenticatedUserObj:AuthenticatedUser = AuthenticatedUserJSON;

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [AuthorizationService,{provide: SecureStorageService, useValue: secureStorage}]
      });
      service = TestBed.inject(AuthorizationService);
      secureStorageService = TestBed.inject(SecureStorageService)

      spyOn(secureStorageService, 'getItem').and.callThrough();

      spyOn(secureStorageService, 'setItem').and.callThrough();

      spyOn(secureStorageService, 'removeItem').and.callThrough();

    });

    it('can load instance', () => {
      expect(service).toBeTruthy();
    });

    describe("#signOut",()=>{
      it('should destroy user session data on sign out', () => {
        store['user'] = "test";
        store['permissions'] = "test";
        store['accessToken'] = "test";

        expect(Object.keys(store)).toContain("user");
        expect(Object.keys(store)).toContain("permissions");
        expect(Object.keys(store)).toContain("accessToken");

        service.signOut();

        expect(Object.keys(store)).not.toContain("user");
        expect(Object.keys(store)).not.toContain("permissions");
        expect(Object.keys(store)).not.toContain("accessToken");
      });
    });
  //
  // describe("#isUserDataPresent",()=>{
  //     it("should return true if #permissions is set",()=>{
  //       service.permissions = permissionObj;
  //
  //       expect(service.isUserDataPresent).toBeTrue();
  //     })
  //     it("should return false if #permissions is undefined",()=>{
  //       service.permissions = undefined;
  //
  //       expect(service.isUserDataPresent).toBeFalse();
  //     })
  //   })

    describe("#userDisplayName",()=>{
      it("should return name if #isUserDataPresent is true",()=>{
        service.permissions = permissionObj;

        expect(service.userDisplayName).toEqual(permissionObj.name);
      })
      it("should return empty string if #isUserDataPresent is flase",()=>{
        service.permissions = undefined;

        expect(service.userDisplayName).toEqual("");
      })
    })

    describe("#tokenExpired",()=>{
      it("should return true when a token has expired",()=>{
        //set to 5 minutes ago expiry
        let json = btoa(JSON.stringify({
          exp: (Math.floor(((new Date).getTime()-(300*1000)) / 1000))
        }));

        let token = "sect1."+json+".sect3";

        let result = service.tokenExpired(token);

        expect(result).toBeTrue();

      })

      it("should return false when a token has not expired",()=>{
        //5 minutes
        let json = btoa(JSON.stringify({
          exp: (Math.floor(((new Date).getTime()+(300*1000)) / 1000))
        }));

        let token = "sect1."+json+".sect3";

        let result = service.tokenExpired(token);

        expect(result).toBeFalse();

      })
    });

    describe("#isAccessTokenExpired",()=>{
      it("should call #tokenExpired",()=>{
        service.userAccessToken = "test";
        spyOn(service,"tokenExpired").and.returnValue(true);

        service.isAccessTokenExpired();

        expect(service.tokenExpired).toHaveBeenCalledWith(service.userAccessToken);
      })
    });

    describe("#isUserLoggedIn",()=>{
      it("should call return false if #userAccessToken is undefined and not to call #isAccessTokenExpired",()=>{
        service.userAccessToken = undefined;
        spyOn(service,"isAccessTokenExpired").and.returnValue(true);

        let result = service.isUserLoggedIn();

        expect(service.isAccessTokenExpired).not.toHaveBeenCalled();
        expect(result).toBeFalse();
      });

      it("should call return true if #userAccessToken is set and #isAccessTokenExpired is called and returns false",()=>{
        service.userAccessToken = "test";
        spyOn(service,"isAccessTokenExpired").and.returnValue(false);

        let result = service.isUserLoggedIn();

        expect(service.isAccessTokenExpired).toHaveBeenCalled();
        expect(result).toBeTrue();
      })

      it("should call return false if #userAccessToken is set and #isAccessTokenExpired is called and returns true",()=>{
        service.userAccessToken = "test";
        spyOn(service,"isAccessTokenExpired").and.returnValue(true);

        let result = service.isUserLoggedIn();

        expect(service.isAccessTokenExpired).toHaveBeenCalled();
        expect(result).toBeFalse();
      })

    });

    describe("#setAccessToken()",()=>{
      it('should set token in sessionStorage and on the userAccessToken property', () => {
        service.userAccessToken = undefined;
        store = {};
        expect(Object.keys(store)).not.toContain("accessToken");

        service.setAccessToken("test");

        expect(Object.keys(store)).toContain("accessToken");
        expect(service.userAccessToken).toEqual("test");
        expect(secureStorageService.getItem("accessToken")).toEqual("test");
      });
    })

    describe("#initilize()",()=>{
      it("should set values from sessionStorage",()=>{
        store['user'] = JSON.stringify(AuthenticatedUserJSON);
        store['permissions'] = JSON.stringify(PermissionsJSON);
        store['accessToken'] = "test";

        service.initialize();

        expect(service.user).toEqual(authenticatedUserObj);
        expect(service.permissions).toEqual(permissionObj);
        expect(service.userAccessToken).toEqual("test");
      })
    })

    describe("#setPermissions()",()=>{
      it('should store permissions in the session storage ', () => {
        service.permissions = undefined;

        expect(service.permissions).toBeUndefined();

        service.setPermissions(permissionObj);

        expect(service.permissions).toEqual(permissionObj)
        expect(secureStorageService.getItem("permissions")).toEqual(JSON.stringify(PermissionsJSON));
      });
    })

    describe('#updateUserInfo', () => {
      it('makes expected HTTP GET call to the permission user service', () => {
        const httpTestingController = TestBed.inject(HttpTestingController);

        service.updateUserInfo().then(res => {
          expect(service.user).toEqual(authenticatedUserObj);
          expect(secureStorageService.getItem("user")).toEqual(JSON.stringify(AuthenticatedUserJSON))
        });

        const req = httpTestingController.expectOne(environment.retrieveCurrentUser);

        expect(req.request.method).toEqual('GET');

        req.flush(AuthenticatedUserJSON);

        httpTestingController.verify();
      });
    });

    describe('#getPermissions', () => {
      it('makes expected HTTP POST calls to the permission service to return permissions and branches and run #setPermissions', () => {
        const httpTestingController = TestBed.inject(HttpTestingController);

        spyOn(service, 'setPermissions');

        service.getPermissions().subscribe(res => {
          expect(res).toEqual(permissionObj);
          expect(service.setPermissions).toHaveBeenCalledWith(res);
        });

        const req = httpTestingController.expectOne(environment.retrievepagespermissionsbywebauth);
        expect(req.request.method).toEqual('POST');
        req.flush(PermissionsJSON);
        httpTestingController.verify();
      });
    });

})
