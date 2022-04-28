import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PermissionsService } from 'src/app/shared/services/permissions/permissions.service';
import { AddPermissionsComponent } from './add-permissions.component';

describe('AddPermissionsComponent', () => {
  let component: AddPermissionsComponent;
  let fixture: ComponentFixture<AddPermissionsComponent>;
  let permissionsService: PermissionsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPermissionsComponent ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: PermissionsService, useValue: {}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPermissionsComponent);
    permissionsService = TestBed.inject(PermissionsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
