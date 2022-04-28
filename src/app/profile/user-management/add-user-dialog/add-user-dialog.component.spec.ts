import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDialog} from '@angular/material/dialog';
// import { MatDialogMock } from '../../dealer-account-settings/dealer-account-settings.component.spec';
import { AddUserDialogComponent } from './add-user-dialog.component';
import {of} from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alloweddealership } from 'src/app/shared/models/permissions/permissions';
import { PermissionsService } from 'src/app/shared/services/permissions/permissions.service';
import {ProfileService} from 'src/app/shared/services/profile/profile.service';
import { Overlay } from '@angular/cdk/overlay';
export class MatDialogMock {
  open() {
   return {
     afterClosed: () => of(true)
   };
 }
}

describe('AddUserDialogComponent', () => {
  let component: AddUserDialogComponent;
  let fixture: ComponentFixture<AddUserDialogComponent>;
  let dialog = new MatDialogMock();
  let permissionService: PermissionsService;
  let profileService: ProfileService;

  beforeEach(() => {

      TestBed.configureTestingModule({
      declarations: [ AddUserDialogComponent ],
      providers: [
        { provide: MatDialog, useValue: dialog },
        {provide: MatDialogMock},
        {provide: FormBuilder},
        {provide: HttpClient},
        {provide: HttpHandler},
        {provide: MatSnackBar},
        {provide: Overlay},
        {provide: PermissionsService, useValue: {
          permissions:{
            alloweddealerships:{

            }
          }
        }}
      ]
    })

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserDialogComponent);
    dialog = TestBed.inject(MatDialogMock);
    permissionService = TestBed.inject(PermissionsService);
    profileService = TestBed.inject(ProfileService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('#open add permission dialog ', ()=>{
    expect(component.openAddPermissionsDialog).toBeTruthy();
  })
});
