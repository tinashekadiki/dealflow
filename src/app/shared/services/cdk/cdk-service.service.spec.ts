/* tslint:disable:no-unused-variable */

import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { CdkServiceService } from './cdk-service.service';

describe('Service: CdkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CdkServiceService, HttpClient, HttpHandler]
    });
  });

  it('should ...', inject([CdkServiceService], (service: CdkServiceService) => {
    expect(service).toBeTruthy();
  }));
});
