import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntegrationsComponent } from './integrations.component';
import { HttpClient, HttpHandler} from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';
import { PermissionsService } from 'src/app/shared/services/permissions/permissions.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Injectable({providedIn: 'root'})
class PermissionsServiceStub {
   allowedDealership: {
     permissions: {
        alloweddealerships: ['test1', 'test2']
  }};
}

describe('IntegrationsComponent', () => {
  let component: IntegrationsComponent;
  let fixture: ComponentFixture<IntegrationsComponent>;
  let permissionsService: PermissionsService;
  let snackBar: MatSnackBar;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ IntegrationsComponent ],
      providers:[
        {provide: HttpClient},
        {provide: HttpHandler},
        {provide: FormBuilder},
        {provide: MatSnackBar},
        {provide: Overlay},
        {provide: PermissionsService, useValue:{
          permissions:{
            alloweddealerships:['test1', 'test2']
          }
        } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        NoopAnimationsModule
      ]
    })
    fixture = TestBed.createComponent(IntegrationsComponent);
    permissionsService = TestBed.inject(PermissionsService);
    snackBar =TestBed.inject(MatSnackBar);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('#ngOnInit should make a call to set allowed dealership', () =>{
    fixture.detectChanges();
    expect(component.initialiseForms).toBeTruthy();
  });
  it('should load save account-settings', ()=>{
    fixture.detectChanges();
    expect(component.saveSettings).toBeTruthy();
  });
  afterAll(()=> {
    TestBed.resetTestingModule();
  });
});
