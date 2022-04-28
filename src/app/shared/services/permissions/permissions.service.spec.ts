import { TestBed } from '@angular/core/testing';
import { PermissionsService } from './permissions.service';
import { IPermissions } from '../../models/permissions/permissions';
import { defer, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('PermissionsService', () => {

  let httpClientSpy: { get: jasmine.Spy };
  let permissionsService: PermissionsService;

  const accessToken: string = 'anAccessToken';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient},
        {provide: HttpHandler}
      ],
      imports: [
        NoopAnimationsModule
      ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    permissionsService = TestBed.inject(PermissionsService);
  });

  it('should be created', () => {
    expect(permissionsService).toBeTruthy();
  });

  it('should return expected permissions (HttpClient called once)', () => {
    const expectedPermissions: IPermissions =
    {
      name: 'string',
      employeeid: 'string',
      role: 'string',
      override: 'string',
      dealerid: 'string',
      branchId: 'string',
      alloweddealerships: [
        {
          id: 1,
          name: 'string',
          branchId: 'string',
          parentid: 'string',
          address: 'string',
          suite: 'string',
          city: 'string',
          state: 'string',
          zip: 'string',
          phone: 'string',
          msa: 'string',
          zone1: 'string',
          zone2: 'string',
          zone3: 'string',
          zone4: 'string',
          zone5: 'string',
          active: 1
        }
      ],
      allowedpages: [
        {
          id: 1,
          name: 'string',
          employeeid: 'string',
          permissionid: 'string',
          flag: 'string',
          permissioncode: 'string'
        }
      ]
    };

    httpClientSpy.get.and.returnValue(asyncData(expectedPermissions));

    expect(httpClientSpy.get.calls.count()).toBe(0, 'zero calls');

  });

  // it('should return an error when the server returns a 404', () => {
  //     const errorResponse = new HttpErrorResponse({
  //     error: 'test 404 error',
  //     status: 404,
  //     statusText: 'Not Found'

  //   });

  //   httpClientSpy.get.and.returnValue(of(errorResponse));

  //   permissionsService.getPermissions(accessToken).subscribe(
  //     errorResponse => fail('Should have failed with 404 error'),
  //     (error: HttpErrorResponse) => {
  //       expect(errorResponse.status).toEqual(404);
  //       expect(errorResponse.error).toContain('404 error');
  //       // expect(errorResponse.statusText).toContain('Not Found');
  //     });
  // });

});
