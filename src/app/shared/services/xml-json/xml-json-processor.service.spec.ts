import { TestBed } from '@angular/core/testing';

import { XmlJsonProcessorService } from './xml-json-processor.service';

describe('XmlJsonProcessorService', () => {
  let service: XmlJsonProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmlJsonProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
