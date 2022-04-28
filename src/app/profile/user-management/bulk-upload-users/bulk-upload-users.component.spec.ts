import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../../../shared/services/user/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BulkUploadUsersComponent} from './bulk-upload-users.component';
import {HttpClient, HttpHandler} from '@angular/common/http';


describe('BulkUploadUsersComponent', () => {
  let component: BulkUploadUsersComponent;
  let fixture: ComponentFixture<BulkUploadUsersComponent>;
  let userService: UserService;
  let snackBar: MatSnackBar;
  let formBuilder: FormBuilder;

  beforeEach( () => {
     TestBed.configureTestingModule({
      declarations: [ BulkUploadUsersComponent],
      providers: [
        FormBuilder, HttpClient, HttpHandler,
        {
          provide: MatSnackBar, useValue: {
            open: (message, action, opt) => {
            }
          }
        },
        {provide: UserService, useValue: {}}
        ]
    });
     fixture = TestBed.createComponent(BulkUploadUsersComponent);
     formBuilder = TestBed.inject(FormBuilder);
     userService = TestBed.inject(UserService);
     snackBar = TestBed.inject(MatSnackBar);
     component = fixture.componentInstance;
  });
  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should initialise data source ', () => {
    fixture.detectChanges();
    expect(component.dataSource.length).toBeTruthy();
  });
  it('should initialise displayed columns to 4', () => {
    fixture.detectChanges();
    expect(component.displayedColumns).toBeTruthy();
    expect(component.displayedColumns.length).toBe(5);
  });
  it('should be able to call clear files', () => {
    fixture.detectChanges();
    // expect(component.clearFiles).toBeTruthy();
  });
  it('should initialise upload file method', () => {
    fixture.detectChanges();
    // expect(component.uploadFile).toBeTruthy();
  });
  it('should initialise the on file select method', () => {
    fixture.detectChanges();
    // expect(component.onFileSelected).toBeTruthy();
  });
});
