import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { Injectable } from '@angular/core';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
@Injectable({providedIn: 'root'})
class AuthorizationServiceStub {

}

@Injectable({providedIn: 'root'})
class FakeRouter {

}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [{provide: Router, useClass: FakeRouter},
        {provide: AuthorizationService, useClass: AuthorizationServiceStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
