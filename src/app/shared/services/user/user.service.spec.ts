import { TestBed } from '@angular/core/testing';
import {HttpClient, HttpHandler} from '@angular/common/http';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient},
        {provide: HttpHandler}
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should load getUsers', ()=>{
    expect(service.getUsers).toBeTruthy();
  });
  it('should load uploadUsers', ()=>{
    expect(service.uploadUsers).toBeTruthy();
  })
});
